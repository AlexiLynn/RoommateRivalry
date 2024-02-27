// Chore.js
class Chore {
  constructor(description, deadline, points, assignee) {
    this.description = description;
    this.deadline = new Date(deadline);
    this.points = points;
    this.assignee = assignee;
  }
}

export default Chore;
