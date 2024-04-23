import Image from 'next/image'
import React from 'react'
import { CiTwitter } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa'
import { RiLinkedinLine } from 'react-icons/ri'
import { SlSocialFacebook } from 'react-icons/sl'
// import QrImage from "../../public/Images/qr.png"

const Footer = () => {
  return (
    <footer className=' right-0 left-0 bottom-0  items-center  p-4 bg-black text-white footer'>
    <div className='grid grid-cols-5 gap-5 mx-auto max-w-screen-xl'>
    <div>
        <p>Exclusive</p>
        <p>Subscribe</p>
        <p>Get 10% off your first order</p>
        <p><input type='email' placeholder='Enter your email'/></p>
        
    </div>
    <div>
        <p>Support</p>
        <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
        
    </div>
    <div>
        <p>Account</p>
        <p>My Account</p>
        <p>Login / Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
        <p>Shop</p>
        
    </div>
    <div>
        <p> Quick Link</p>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
       
    </div>
    <div>
        <p>Download App</p>
        <p>Save $3 with App New User Only</p>
        <p>
            {/* <img src='./assets/qr.png'/> */}
            {/* <Image alt='qr image' src={QrImage} height={76} width={76}/> */}
            
        </p>
        <div className='grid grid-cols-4 mt-3'>
            <div><SlSocialFacebook /></div>
            <div><CiTwitter /></div>
            <div><FaInstagram /></div>
            <div><RiLinkedinLine /></div>
        </div>
    </div>
    </div>
</footer>
  )
}

export default Footer