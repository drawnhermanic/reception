import { JsonServiceClient, GetNavItems } from "@servicestack/client";

import { GetVisitors, CreateVisit, EndVisit, Authenticate, GetUser } from "./dtos";

export const client = new JsonServiceClient("/");
client.bearerToken = localStorage.getItem('bearerToken');

export const getNav = async () => await client.get(new GetNavItems());

export const checkAuth = async () => {
    try {
        return await client.post(new Authenticate());
    } catch (e) {
        return null;
    }
};

export const auth = async (request) => {
    localStorage.setItem('bearerToken', null);
    const response = await client.post(request);
    localStorage.setItem('bearerToken', client.bearerToken = response.bearerToken);
    return response;
}

export const register = async (request) => {
    localStorage.setItem('bearerToken', null);
    const response = await client.post(request);
    localStorage.setItem('bearerToken', client.bearerToken = response.bearerToken);
    return response;
}

export const signout = async () => {
    localStorage.setItem('bearerToken', null);
    await client.post(new Authenticate({ provider: 'logout' }));
};

export const getVisitors = async () => {
    let response = await client.get(new GetVisitors());
    return response.visitors;
}

export const getUser = async () => {
    return await client.get(new GetUser());
}

export const createVisit = async (request) => {
    return await client.post(request)
}

export const endVisit = async (request) => {
    return await client.post(request)
}
