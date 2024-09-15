export class TokenUtil {
  static accessToken?: string;
  static refreshToken?: string;
  static resetToken?: string;
  static loadToken() {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const resetToken = localStorage.getItem("reset_token");

    if (accessToken) {
      TokenUtil.setAccessToken(accessToken);
    }

    if (refreshToken) {
      TokenUtil.setRefreshToken(refreshToken);
    }

    if (resetToken) {
      TokenUtil.setResetToken(resetToken);
    }
  }

  static persistToken() {
    if (TokenUtil.accessToken != null) {
      localStorage.setItem("access_token", TokenUtil.accessToken);
    } else {
      localStorage.removeItem("access_token");
    }

    if (TokenUtil.refreshToken != null) {
      localStorage.setItem("refresh_token", TokenUtil.refreshToken);
    } else {
      localStorage.removeItem("refresh_token");
    }

    if (TokenUtil.resetToken != null) {
      localStorage.setItem("reset_token", TokenUtil.resetToken);
    } else {
      localStorage.removeItem("reset_token");
    }
  }

  static setAccessToken(accessToken: string) {
    TokenUtil.accessToken = accessToken;
  }

  static setRefreshToken(refreshToken: string) {
    TokenUtil.refreshToken = refreshToken;
  }

  static setResetToken(resetToken: string) {
    TokenUtil.resetToken = resetToken;
  }

  static clearAccessToken() {
    TokenUtil.accessToken = undefined;
  }

  static clearRefreshToken() {
    TokenUtil.accessToken = undefined;
  }

  static clearResetToken() {
    TokenUtil.resetToken = undefined;
  }
}
