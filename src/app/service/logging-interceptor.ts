import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {UserService} from "./userService";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(UserService).getToken();
  if (token) {
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }
  return next(req);
}




