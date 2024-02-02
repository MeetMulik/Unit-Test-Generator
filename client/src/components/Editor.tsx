import React from "react";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";

function EditorComponent() {
  const [code, setCode] = React.useState(
    "To effectively test the `getAllPosts` function, we can utilize the popular testing library Jest. First, let's install Jest using npm:\n\n```bash\nnpm install jest --save-dev\n```\n\nNow, let's create a test file, `getAllPosts.test.js`, and write unit tests for the `getAllPosts` function:\n\n```javascript\nconst { getAllPosts } = require('./path/to/your/file');\nconst Post = require('./path/to/your/Post/model'); // Assuming this is your Post model\n\n// Mock dependencies\njest.mock('./path/to/your/Post/model', () => ({\n  find: jest.fn().mockReturnThis(),\n  populate: jest.fn().mockReturnThis(),\n  sort: jest.fn().mockReturnThis(),\n}));\n\ndescribe('getAllPosts', () => {\n  let req, res;\n\n  beforeEach(() => {\n    req = {}; // Mock request object\n    res = {\n      status: jest.fn().mockReturnThis(),\n      json: jest.fn(),\n    }; // Mock response object\n  });\n\n  afterEach(() => {\n    jest.clearAllMocks();\n  });\n\n  test('should return all posts and status 200 when successful', async () => {\n    // Mock the returned value from the Post model\n    const posts = [{ title: 'Post 1' }, { title: 'Post 2' }, { title: 'Post 3' }];\n    Post.find.mockResolvedValue(posts);\n\n    await getAllPosts(req, res);\n\n    expect(Post.find).toHaveBeenCalled();\n    expect(Post.populate).toHaveBeenCalledWith('postedBy', 'username profileImg');\n    expect(Post.sort).toHaveBeenCalledWith({ createdAt: -1 });\n    expect(res.status).toHaveBeenCalledWith(200);\n    expect(res.json).toHaveBeenCalledWith({ message: 'All posts found', posts });\n  });\n\n  test('should return status 500 with error message when an error occurs', async () => {\n    const errorMessage = 'Internal server error';\n    Post.find.mockRejectedValue(new Error(errorMessage));\n\n    await getAllPosts(req, res);\n\n    expect(Post.find).toHaveBeenCalled();\n    expect(res.status).toHaveBeenCalledWith(500);\n    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });\n  });\n});\n```\n\nExplanation:\n\n1. We import the `getAllPosts` function and the `Post` model from the respective files.\n2. We create a mock implementation for the `Post` model using Jest's `jest.fn()` and `mockReturnThis()` to simulate method chaining.\n3. In the test cases, we mock the expected behavior and return values of the `Post` model methods:\n   - For the successful case, we use `mockResolvedValue` to mock a resolved promise with a sample array of posts.\n   - For the error case, we use `mockRejectedValue` to mock a rejected promise with an error.\n4. We create mock request and response objects using empty objects.\n5. In the `beforeEach` hook, we reset the mocks and clear all mock calls to start with a clean state for each test.\n6. In the first test case, we call `getAllPosts` and use Jest's `expect` to make assertions about the expected behavior and function calls.\n7. The second test case simulates an error by rejecting the promise from the `Post.find` method, and we assert that the response status and message match the expected error response.\n\nTo run the tests, use the following command:\n\n```bash\nnpx jest getAllPosts.test.js\n```\n\nMake sure to update the paths to the relevant files according to your project structure."
  );
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      color="#FFFFFF"
      style={{
        fontFamily: "monospace",
        fontSize: 14,
      }}
    />
  );
}

export default EditorComponent;
