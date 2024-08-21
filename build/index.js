"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
function listFiles(dir_1) {
    return __awaiter(this, arguments, void 0, function* (dir, indent = '', last = true) {
        try {
            const data = (yield fs.readdir(dir, { withFileTypes: true })).sort((a, b) => {
                if (a.isDirectory() && !b.isDirectory())
                    return -1;
                if (!a.isDirectory() && b.isDirectory())
                    return 1;
                return a.name.localeCompare(b.name);
            });
            for (const [index, entry] of data.entries()) {
                const fullPath = path.join(dir, entry.name);
                const isLast = index === data.length - 1;
                if (entry.isDirectory()) {
                    console.log(`${indent}${isLast ? '└── ' : '├── '}${entry.name}`);
                    yield listFiles(fullPath, `${indent}${isLast ? '    ' : '│   '}`, isLast);
                }
                else {
                    console.log(`${indent}${isLast ? '└── ' : '├── '}${entry.name}`);
                }
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${dir}: ${err.message}`);
            }
            else {
                console.error(`Unknown error: ${dir}`);
            }
        }
    });
}
const rootDir = 'node_modules';
listFiles(rootDir);
//# sourceMappingURL=index.js.map