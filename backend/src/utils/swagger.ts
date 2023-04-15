import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            description: 'API for managing articles in a blog',
            version: '1.0.0',
        },
        servers: [
            {
                url: `//${process.env.HOSTED_URL}/api`,
            },
        ],
        schemes: ['http'],
        produces: ['application/json'],
        tags: [
            {
                name: 'user',
                description: 'Operations about users',
            },
            {
                name: 'article',
                description: 'Operations about articles',
            },
        ],
        paths: {
            '/articles': {
                post: {
                    tags: ['article'],
                    summary: 'Add a new article to the blog',
                    description: 'Add a new article to the blog',
                    requestBody: {
                        description: 'Create a new article in the blog',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article',
                                },
                            },
                            'application/xml': {
                                schema: {
                                    $ref: '#/components/schemas/Article',
                                },
                            },
                            'application/x-www-form-urlencoded': {
                                schema: {
                                    $ref: '#/components/schemas/Article',
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                        '405': {
                            description: 'Invalid input',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
                get: {
                    tags: ['article'],
                    summary: 'Gets all article',
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Article',
                                        },
                                    },
                                },
                                'application/xml': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Article',
                                        },
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid status value',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/articles/{articleId}': {
                get: {
                    tags: ['article'],
                    summary: 'Find article by ID',
                    description: 'Returns a single article',
                    parameters: [
                        {
                            name: 'articleId',
                            in: 'path',
                            description: 'ID of article to return',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid ID supplied',
                        },
                        '404': {
                            description: 'article not found',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/articles/search': {
                get: {
                    tags: ['article'],
                    summary: 'Search article based on category or tags',
                    parameters: [
                        {
                            name: 'query',
                            in: 'query',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid ID supplied',
                        },
                        '404': {
                            description: 'article not found',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/articles/{articleId}/like': {
                put: {
                    tags: ['article'],
                    summary: 'Likes an article',
                    parameters: [
                        {
                            name: 'articleId',
                            in: 'path',
                            description: 'ID of article to update',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/articles/{articleId}/dislike': {
                put: {
                    tags: ['article'],
                    summary: 'Dislikes an article',
                    parameters: [
                        {
                            name: 'articleId',
                            in: 'path',
                            description: 'ID of article to update',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/articles/{articleId}/comments': {
                put: {
                    tags: ['article'],
                    summary: 'Adds a comment',
                    parameters: [
                        {
                            name: 'articleId',
                            in: 'path',
                            description: 'ID of article to update',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        comment: 'Nice article',
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Article',
                                    },
                                },
                            },
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/users/register': {
                post: {
                    tags: ['user'],
                    summary: 'Create user',
                    requestBody: {
                        description: 'Request body',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        default: {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/users/login': {
                post: {
                    tags: ['user'],
                    summary: 'Logs user into the system',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        email: 'test@gmail.com',
                                        password: 'testuser1',
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        example: {
                                            token: 'adadadsdasdada',
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: 'successful operation',
                        },
                    },
                },
            },
            '/users/profile': {
                get: {
                    tags: ['user'],
                    summary: 'Fetch user profile',
                    responses: {
                        '200': {
                            description: 'successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid username/password supplied',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
            '/users/profile/update': {
                post: {
                    tags: ['user'],
                    summary: 'Update user profile',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        name: 'test user 1.1',
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        default: {
                            description: 'successful operation',
                        },
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'test@gmail.com',
                        },
                        name: {
                            type: 'string',
                            example: 'test user 1',
                        },
                        password: {
                            type: 'string',
                            example: 'testuser1',
                        },
                        likedArticles: {
                            type: 'array',
                        },
                    },
                },
                Article: {
                    required: ['title', 'text', 'category', 'tags'],
                    type: 'object',
                    properties: {
                        ArticleId: {
                            type: 'string',
                            example: 'roe645se',
                        },
                        title: {
                            type: 'string',
                            example: 'A new article title',
                        },
                        text: {
                            type: 'string',
                            example: 'A new article text',
                        },
                        category: {
                            type: 'array',
                            example: ['generic'],
                        },
                        tags: {
                            type: 'array',
                            items: ['latest'],
                        },
                    },
                    xml: {
                        name: 'article',
                    },
                },
            },
            requestBodies: {
                article: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Article',
                            },
                        },
                        'application/xml': {
                            schema: {
                                $ref: '#/components/schemas/Article',
                            },
                        },
                    },
                },
                UserArray: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    scheme: 'bearer',
                    name: 'Authorization',
                    bearerFormat: 'JWT',
                    in: 'header',
                },
            },
        },
    },
    apis: ['app.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
