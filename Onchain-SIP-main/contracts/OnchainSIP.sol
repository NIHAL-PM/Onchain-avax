// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OnchainSIP {

    struct SIPPlan {
        address token;             // Token address or address(0) for native
        uint256 totalAmount;       // Total amount deposited
        uint256 amountPerInterval; // Amount per interval
        uint256 frequency;         // Interval in seconds
        uint256 nextExecution;     // Next SIP time
        uint256 maturity;          // End time
        address destAddress;       // Recipient
        uint256 executedAmount;    // Already executed
        bool active;               // Status
    }

    mapping(address => mapping(string => SIPPlan)) public userPlans; // user => pool => plan

    event PlanCreated(address indexed user, string pool, uint256 total, uint256 intervalAmount);
    event SIPExecuted(address indexed user, string pool, uint256 amount, uint256 time);
    event SIPFinalized(address indexed user, string pool, uint256 remainingAmount);

    /// @notice Creates a SIP plan using ERC20 tokens
    function createPlan(
        string memory pool,
        address token,
        uint256 totalAmount,
        uint256 amountPerInterval,
        uint256 frequency,
        uint256 maturity,
        address destAddress
    ) external {
        require(totalAmount >= 100 * 1e18, "Minimum total amount is $100");
        require(amountPerInterval >= 3 * 1e18, "Minimum interval amount is $3");
        require(block.timestamp < maturity, "Maturity must be in future");
        require(!userPlans[msg.sender][pool].active, "SIP already exists");

        IERC20(token).transferFrom(msg.sender, address(this), totalAmount);

        userPlans[msg.sender][pool] = SIPPlan({
            token: token,
            totalAmount: totalAmount,
            amountPerInterval: amountPerInterval,
            frequency: frequency,
            nextExecution: block.timestamp + frequency,
            maturity: maturity,
            destAddress: destAddress,
            executedAmount: 0,
            active: true
        });

        emit PlanCreated(msg.sender, pool, totalAmount, amountPerInterval);
    }

    /// @notice Creates a SIP plan using native BNB
    function createPlanWithNative(
        string memory pool,
        uint256 amountPerInterval,
        uint256 frequency,
        uint256 maturity,
        address destAddress
    ) external payable {
        require(msg.value >= 0.2 ether, "Minimum total is 0.2 tBNB");
        require(amountPerInterval >= 0.006 ether, "Interval too small");
        require(block.timestamp < maturity, "Maturity must be in future");
        require(!userPlans[msg.sender][pool].active, "SIP already exists");

        userPlans[msg.sender][pool] = SIPPlan({
            token: address(0), // native token
            totalAmount: msg.value,
            amountPerInterval: amountPerInterval,
            frequency: frequency,
            nextExecution: block.timestamp + frequency,
            maturity: maturity,
            destAddress: destAddress,
            executedAmount: 0,
            active: true
        });

        emit PlanCreated(msg.sender, pool, msg.value, amountPerInterval);
    }

    /// @notice Executes a SIP interval
    function executeSIP(string memory pool) external {
        SIPPlan storage plan = userPlans[msg.sender][pool];
        require(plan.active, "No active SIP");
        require(block.timestamp >= plan.nextExecution, "Too early");
        require(block.timestamp < plan.maturity, "Matured");
        require(plan.executedAmount + plan.amountPerInterval <= plan.totalAmount, "All funds used");

        plan.executedAmount += plan.amountPerInterval;
        plan.nextExecution += plan.frequency;

        emit SIPExecuted(msg.sender, pool, plan.amountPerInterval, block.timestamp);
    }

    /// @notice Finalizes SIP and returns leftover
    function finalizeSIP(string memory pool) external {
        SIPPlan storage plan = userPlans[msg.sender][pool];
        require(plan.active, "No active SIP");
        require(block.timestamp >= plan.maturity, "Not matured");

        uint256 remaining = plan.totalAmount - plan.executedAmount;
        if (remaining > 0) {
            if (plan.token == address(0)) {
                payable(plan.destAddress).transfer(remaining);
            } else {
                IERC20(plan.token).transfer(plan.destAddress, remaining);
            }
        }

        plan.active = false;
        emit SIPFinalized(msg.sender, pool, remaining);
    }

    /// @notice View a user's plan
    function getPlan(address user, string memory pool) external view returns (SIPPlan memory) {
        return userPlans[user][pool];
    }

    // Allow contract to receive BNB
    receive() external payable {}
}
