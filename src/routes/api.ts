class Project {
  private readonly base: string = "projects";

  getProjectsInfo() {
    return `${this.base}/get-all-info`;
  }
}

export const projectRoutes = new Project();
