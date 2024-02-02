import Navbar from "./components/Navbar";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [code, setCode] = useState(``);
  const [tests, setTests] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async (code: string) => {
    const result = await fetch(
      "https://unit-test-generator-backend-production.up.railway.app/",
      {
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    const data = await result.json();
    console.log("result", data);
    setTests(data.responseText);
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      if (code.length === 0) return;
      toast.promise(fetchResults(code), {
        pending: "Unit tests are being generated",
        success: "Unit tests generated successfully",
        error: "Error generating tests!",
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [tests]);

  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="mt-9 flex flex-col items-center justify-center sm:mt-20">
        <div className=" flex justify-center items-center">
          <p className="text-4xl m-2 font-bold text-white">
            Unit Test Generator
          </p>
          <div>
            <span
              onClick={handleGenerate}
              className="px-5 py-2.5 relative rounded group  text-white font-medium inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span className="relative">Generate</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
            <div className=" flex flex-col  justify-center space-y-2 sm:w-2/4 ">
              <div className="text-center text-xl font-bold text-white">
                Input (Paste your code here for generating unit tests)
              </div>

              <div className="bg-white overflow-auto h-[400px] w-[600px] m-2">
                <Editor
                  placeholder="Click here and paste codes…"
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                  }}
                  className="container__editor border-2 border-gray-300"
                />
              </div>
            </div>
            <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
              <div className="text-center text-xl font-bold text-white">
                Output (Unit Tests)
              </div>
              <div className="bg-white overflow-auto h-[400px] w-[700px]">
                <Editor
                  value={tests}
                  onValueChange={(test) => setTests(test)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-3">
        <p className="text-white text-center">
          Make with ❤️ for KnitAI by Meet Mulik
        </p>
      </div>
    </div>
  );
};

export default App;
