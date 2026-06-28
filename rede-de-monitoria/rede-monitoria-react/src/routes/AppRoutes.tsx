import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro"
import Login from "../pages/Login/Login"
import Disciplina from "../pages/Disciplina/Disciplina"
import Home from "../pages/Home/Home"

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    path="/"
                    element={<Home />}
                </Route>
                <Route>
                    path="/login"
                    element={<Login />}
                </Route>
                <Route>
                    path="/cadastro"
                    element={<Cadastro />}
                </Route>
                <Route>
                    path="/disciplina/:id"
                    element={<Disciplina />}
                </Route>
                <Route>
                    path="*"
                    element={<h1>Página não encontrada.</h1>}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;