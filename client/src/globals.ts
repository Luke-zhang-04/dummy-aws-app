/**
 * Dummy AWS application
 * @license 0BSD
 * @author Luke Zhang luke-zhang-04.github.io
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the 0BSD License
 *
 * This program is distributed in the hope that it will be useful,
 * but THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 */

export const url = process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3333"
    : "https://6lnooio7f6.execute-api.us-east-1.amazonaws.com/prod"

export default {
    url,
}
