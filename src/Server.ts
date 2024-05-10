import appInit from "./App";
import SwaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

appInit().then((app) => {
    if (process.env.NODE_ENV == "development") {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Web development REST API",
                    version: "1.0.0",
                    description:
                        "List all the routes of the backend REST API...",
                },
                servers: [
                    {
                        url: "http://localhost:" + process.env.PORT,
                    },
                ],
            },
            apis: ["./src/routes/*.ts"],
        };
        const specs = swaggerJSDoc(options);
        app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(specs));
    }
    app.listen(process.env.PORT, () => {
        console.log(`listening on port http://localhost:${process.env.PORT}`);
    });
});
