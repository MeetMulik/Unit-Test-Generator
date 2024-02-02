import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

let corsOptions = {
    origin: "https://unit-test-generator-client.vercel.app"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const url = 'https://api.getknit.ai/v1/router/run';
const authToken = process.env.AUTH_TOKEN;



app.get('/', (req: Request, res: Response) => {
    // res.send('Welcome to Express & TypeScript Server');
    res.sendFile('index.html');
});

app.get('/generate', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Express & TypeScript Server' });
});

app.post('/generate', async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        console.log(code);
        const postData = {
            messages: [
                {
                    role: 'system',
                    content: 'Imagine you are the best senior code tester in the world, who can write unit tests for all the languages and knows everything about writing unit tests, structuring unit tests and effectively testing each part of the code.Try using popular libraries for given language to be tested. Only return the code',
                },
                {
                    role: 'user',
                    content: 'Generate unit tests for the following code: {{code}}',
                },
            ],
            model: {
                name: 'openai/gpt-3.5-turbo',
            },
            variables: [
                {
                    name: 'code',
                    value: code,
                },
            ],
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authToken,
            },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        console.log(data);

        return res.status(200).json(data);

    } catch (error: any) {
        throw new Error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
});
