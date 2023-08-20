import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'



import Layout from "./layout";

const root = createRoot(document.querySelector('#app'))
root.render(<Layout />)

