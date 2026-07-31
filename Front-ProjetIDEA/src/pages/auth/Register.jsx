import React, { useState } from "react";
import computer from "../../assets/images/retrocomputer.webp";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth.api";

export default function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }


    setIsLoading(true);


    try {

      const res = await register({
        username,
        password
      });


      console.log("USER CREATED :", res.data);


      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );


      navigate("/dashboard");


    } catch (err) {

      console.log(
        "Register error:",
        err.response?.data || err.message
      );

    } finally {

      setIsLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-mauve-300 flex items-center justify-center p-4 relative overflow-hidden font-sans">


      <div className="relative z-10 w-full max-w-5xl">


        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">



          {/* IMAGE */}

          <div className="md:w-1/2 bg-gradient-to-br from-mauve-400 via-purple-300 to-mauve-300 p-8 flex flex-col justify-center items-center relative overflow-hidden">


            <button

              className="absolute top-5 left-5 text-sm px-6 py-1 rounded-full hover:scale-105 transition-transform duration-300 flex items-center space-x-2 bg-white font-semibold"

              onClick={() => navigate("/")}

            >

              <FaArrowLeft size={15}/>

              <span>Accueil</span>

            </button>



            <div className="relative z-10 mt-12">


              <img

                alt="computer"

                loading="lazy"

                src={computer}

                className="w-120 h-120"

              />


            </div>


          </div>




          {/* FORMULAIRE */}

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">


            <div className="mb-8">


              <h1 className="text-3xl font-bold text-gray-800 mb-2">

                Créer votre compte

              </h1>


            </div>





            <form 
              onSubmit={handleSubmit}
              className="space-y-5"
            >




              {/* USERNAME */}

              <div>


                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Nom d'utilisateur

                </label>



                <input

                  type="text"

                  value={username}

                  onChange={(e)=>setUsername(e.target.value)}

                  onFocus={()=>setFocusedField("username")}

                  onBlur={()=>setFocusedField(null)}

                  placeholder="Votre nom d'utilisateur"

                  required


                  className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    
                    focusedField==="username"

                    ? "border-mauve-500 bg-white shadow-lg"

                    : "border-gray-200"

                  }`}


                />


              </div>







              {/* PASSWORD */}

              <div>


                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Mot de passe

                </label>



                <input


                  type="password"

                  value={password}

                  onChange={(e)=>setPassword(e.target.value)}

                  onFocus={()=>setFocusedField("password")}

                  onBlur={()=>setFocusedField(null)}

                  placeholder="••••••••"

                  required


                  className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    
                    focusedField==="password"

                    ? "border-mauve-500 bg-white shadow-lg"

                    : "border-gray-200"

                  }`}


                />


              </div>








              {/* CONFIRM PASSWORD */}

              <div>


                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Confirmation mot de passe

                </label>




                <input


                  type="password"

                  value={confirmPassword}

                  onChange={(e)=>setConfirmPassword(e.target.value)}

                  onFocus={()=>setFocusedField("confirmPassword")}

                  onBlur={()=>setFocusedField(null)}

                  placeholder="••••••••"

                  required


                  className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    
                    focusedField==="confirmPassword"

                    ? "border-mauve-500 bg-white shadow-lg"

                    : "border-gray-200"

                  }`}


                />


              </div>








              {/* BUTTON */}


              <button


                type="submit"

                disabled={isLoading}


                className="w-full py-3.5 bg-gradient-to-r from-mauve-600 to-purple-700 text-white font-semibold rounded-xl"


              >


                {

                  isLoading

                  ? "Création..."

                  : "Créer un compte"

                }


              </button>



            </form>






            <div className="mt-6 text-center">


              <Link

                to="/login"

                className="text-sm underline underline-offset-4"

              >

                Déjà un compte ? Connectez-vous

              </Link>


            </div>




          </div>



        </div>


      </div>


    </div>

  );

}