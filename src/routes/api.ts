class Project {
  private readonly base: string = "projects";

  getProjectsInfo(language: "fa" | "en") {
    return `${this.base}/get-all-info?language=${language}`;
  }
}


class Team {
  private readonly base: string = "projects";

  getTeamsInfo(language: "fa" | "en") {
    return `${this.base}/get-all-info?language=${language}`;
  }
}

export const projectRoutes = new Project();
export const teamRoutes = new Team();
