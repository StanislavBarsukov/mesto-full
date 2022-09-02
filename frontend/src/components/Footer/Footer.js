import React from "react";
const today = new Date()

const Footer = () => {
    return (
        <div className="footer">
           <p className="footer__copyright">
               &copy;&nbsp;{today.getFullYear()} Mesto Russia
           </p>
        </div>
    )
};
export default Footer