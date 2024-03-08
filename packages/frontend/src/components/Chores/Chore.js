// Chore.js
class Chore { //not needed anymore, delete
  constructor(description, deadline, points, assignee) {
    this.description = description;
    this.deadline = new Date(deadline);
    this.points = points;
    this.assignee = assignee;
    this.householdId = householdId;
    this.userId = userId;
  }
}

export default Chore;
