"use server";

import { Octokit } from "@octokit/rest";

enum RequestTypes {
  Verify = 0,
  Followers = 1,
  Following = 2,
  DeleteFollowing = 3,
  Issues = 4,
}

export const octokitClient = async (
  request: RequestTypes,
  token: string,
  login: string,
  userDelete?: string
): Promise<any> => {
  try {
    const octokit = new Octokit({ auth: token });

    const mapUser = (response: any) =>
      response.data.map((user: any) => ({
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      }));
    
    const mapIssue = (response: any) => response.data.map((issue: any) => ({
      id: issue.id,
      html_url: issue.html_url,
      title: issue.title,
      name: issue.repository.name,
      comments: issue.comments,
      repository_url: issue.repository_url,
      user_avatar_url: issue.user.avatar_url,
      user_html_url: issue.user.html_url,
      user_login: issue.user.login,
    }))

    switch (request) {
      case RequestTypes.Verify:
        return await octokit.request("GET /user");

      case RequestTypes.Followers:
        return await octokit.paginate(
          "GET /users/{username}/followers",
          { username: login, per_page: 100 },
          mapUser
        );

      case RequestTypes.Following:
        return await octokit.paginate(
          "GET /users/{username}/following",
          { username: login, per_page: 100 },
          mapUser
        );

      case RequestTypes.DeleteFollowing:
        if (!userDelete) throw new Error("userDelete requirido");
        return await octokit.request("DELETE /user/following/{username}", {
          username: userDelete,
        });
      case RequestTypes.Issues:
        return await octokit.paginate(
          "GET /user/issues",
          { per_page: 100 },
          mapIssue
        );

      default:
        throw new Error("Request type desconhecido");
    }
  } catch (error: any) {
    let message = "Erro desconhecido";

    if (error instanceof Error) {
      message = error.stack?.split("\n")[0] || error.message;
    }

    console.warn(message);
    return null;
  }
};
