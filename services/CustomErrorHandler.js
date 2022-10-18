class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userExists(status, message) {
    return new CustomErrorHandler(status, message);
  }
  static userDoesntExists(message) {
    return new CustomErrorHandler(404, message);
  }
  static wrongcreds(message) {
    return new CustomErrorHandler(401, message);
  }
  static unAuthorised(message = "Not allowed") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "Not found") {
    return new CustomErrorHandler(404, message);
  }
  static servererror(message = "Not found") {
    return new CustomErrorHandler(500, message);
  }
}

module.exports = { CustomErrorHandler };
