/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum ActivityTypeEnum {
  WORK = "work",
  EDUCATION = "education",
  HOBBY = "hobby",
  ENTERTAINMENT = "entertainment",
  SPORT = "sport",
}

export interface AuthSignUpDto {
  name: string;
  age: string;
  email: string;
  password: string;
  timezone: string;
}

export interface AuthSignUpResponse {
  authToken: string;
}

export interface AuthSignInBadRequestResponse {
  message: string;
  isEmail?: boolean;
  isPassword?: boolean;
}

export interface AuthSignInResponse {
  authToken: string;
}

export interface GetAllUsersResponse {
  _id: string;
  name: string;
}

export interface TaskDto {
  _id: string;
  label: string;
  type: ActivityTypeEnum;
  date: string;
  start: string;
  finish: string;
  description?: string | null;
}

export interface TaskCreateDto {
  label: string;
  type: ActivityTypeEnum;
  date: string;
  start: string;
  finish: string;
  description?: string | null;
}

export interface TaskUpdateDto {
  _id: string;
  label: string;
  type: ActivityTypeEnum;
  date: string;
  start: string;
  finish: string;
  description?: string | null;
}

export interface AnalyticScheduleBusyGetResponse {
  schedule_busy_minutes?: number;
}

export interface AuthControllerSignInParams {
  email: string;
  password: string;
}

export interface TaskControllerGetTasksByDateParams {
  date: string;
}

export interface TaskControllerDeleteTaskParams {
  id: string;
}

export interface AnalyticControllerGetScheduleBusyAnalyticParams {
  date: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Schedly API
 * @version 1.0
 * @contact
 *
 * Schedly API
 */
export class SchedlyApi<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignUp
     * @request POST:/auth/signup
     */
    authControllerSignUp: (data: AuthSignUpDto, params: RequestParams = {}) =>
      this.request<AuthSignUpResponse, any>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignIn
     * @request GET:/auth/signin
     */
    authControllerSignIn: (
      query: AuthControllerSignInParams,
      params: RequestParams = {},
    ) =>
      this.request<AuthSignInResponse, AuthSignInBadRequestResponse>({
        path: `/auth/signin`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerWhoAmI
     * @request GET:/auth/who-am-i
     */
    authControllerWhoAmI: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/who-am-i`,
        method: "GET",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAllUsers
     * @request GET:/user
     */
    userControllerGetAllUsers: (params: RequestParams = {}) =>
      this.request<GetAllUsersResponse[], any>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetProfileImg
     * @request GET:/user/img
     */
    userControllerGetProfileImg: (params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/user/img`,
        method: "GET",
        format: "blob",
        ...params,
      }),
  };
  task = {
    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerGetTasksByDate
     * @request GET:/task/by-date
     */
    taskControllerGetTasksByDate: (
      query: TaskControllerGetTasksByDateParams,
      params: RequestParams = {},
    ) =>
      this.request<TaskDto[], any>({
        path: `/task/by-date`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerCreateTask
     * @request POST:/task/create
     */
    taskControllerCreateTask: (
      data: TaskCreateDto,
      params: RequestParams = {},
    ) =>
      this.request<TaskDto, any>({
        path: `/task/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerUpdateTask
     * @request PATCH:/task/update
     */
    taskControllerUpdateTask: (
      data: TaskUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<TaskDto, any>({
        path: `/task/update`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerDeleteTask
     * @request DELETE:/task/delete/{_id}
     */
    taskControllerDeleteTask: (
      { id, ...query }: TaskControllerDeleteTaskParams,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/task/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  analytic = {
    /**
     * No description
     *
     * @tags Analytic
     * @name AnalyticControllerGetScheduleBusyAnalytic
     * @request GET:/analytic/calculate-schedule-busy/{date}
     */
    analyticControllerGetScheduleBusyAnalytic: (
      { date, ...query }: AnalyticControllerGetScheduleBusyAnalyticParams,
      params: RequestParams = {},
    ) =>
      this.request<AnalyticScheduleBusyGetResponse, any>({
        path: `/analytic/calculate-schedule-busy/${date}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
