import React from 'react'
import Drawer from '../components/Drawer.jsx'
import Footer from '../components/Footer'

function ChangePass() {
    return (
        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[80rem] h-screen border border-2 border-solid border-gray-300 ">
                <h1>เปลี่ยนรหัสผ่าน</h1>
            </div>
             <Footer />
        </div>
    )
}

export default ChangePass