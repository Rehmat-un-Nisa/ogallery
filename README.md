# OGallery

A Sencha Touch 2 and Cordova application that allows you to upload and display products.

It allows a user to register, login to member-area and logout of mobile application. Inside member-area a user can capture product photo, scan barcode of product and upload the product image to server for storage. Uploaded product images can be viewed as thumbnail gallery inside View tab.

It also includes server-side web-service written in PHP using Codeigiter framework. The web-service handles session management and sessions are stored in database.

## Requirements

| *Server-Side*          | *Client-Side*                | 
| ---------------------- | ---------------------------- |
| PHP >= 5               | Android phone                |
| MySQL >= 4             |                              |

## Stuff used in this source-code

| *Server-Side*          | *Client-Side*                | 
| ---------------------- | ---------------------------- |
| Codeigniter 2.0        | Sencha Touch 2.3.1           |
| CodeIgniter Rest Server| Apache Cordova 3.5.0         |
| MySQL >= 4             | Sencha Cmd 5.0.0             |
|                        | Android SDK                  |

## What else is required to build source-code?

Ruby 1.9.3

## References

- CodeIgniter Rest Server<br/>
[https://github.com/chriskacerguis/codeigniter-restserver](https://github.com/chriskacerguis/codeigniter-restserver)

- Mosaic image gallery with Sencha Touch 2.2<br/>
[http://innofied.com/mosaic-image-gallery-with-sencha-touch-2-2/](http://innofied.com/mosaic-image-gallery-with-sencha-touch-2-2/)

- Cross-platform BarcodeScanner for Cordova<br/>
[https://github.com/wildabeast/BarcodeScanner](https://github.com/wildabeast/BarcodeScanner)

## Licence

The MIT License

Copyright (c) 2014 M.Saad Siddiqui

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
