import { CodeEditorState } from "../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";

const getInitialState = () => {

    //if we're on the server, return default values
    if (typeof window === "undefined") {
        return {
            language:"javascript",
            fontSize:14,
            theme:"vs-dark",
        }
    }
     //if we are on the client, return values from local storage
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";

    return{
        language:savedLanguage,
        theme: savedTheme,
        fontSize:Number(savedFontSize),

    }
}

export const useCodeEditorStore = create<CodeEditorState>((set,get) =>{
    const initialState = getInitialState();
    return{
        ...initialState,
        output: "",
        isRunning:false,
        error: null,
        editor:null,
        executionResult: null,

        getCode: () => get().editor?.getValue() || "",

        setEditor: (editor:Monaco) => {
            const savedcode = localStorage.getItem(`editor-code-${get().language}`);
            if (savedcode) editor.setValue(savedcode);

            set({editor})

        },

        setTheme: ( theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({theme})
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({fontSize})
        },

        setLanguage: (language: string) => {
            const currentCode = get().editor?.getValue();
            if(currentCode){
                localStorage.setItem(`editor-code-${language}`, currentCode);
            }

            localStorage.setItem("editor-language",language);

            set({
                language,
                output: "",
                error: null,
            })
        },

        runCode: async () =>{
            
        }

    }
})