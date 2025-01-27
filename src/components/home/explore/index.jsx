import Link from 'next/link'
import React from 'react'
import { FaBuilding } from 'react-icons/fa'

const Explore = () => {
    return (
        <div className="flex justify-center items-center">
            <div
                className="my-6 py-4 px-6 bg-gradient-to-r from-yellow-200 via-amber-500 to-red-300 text-slate-700 rounded-2xl
                 shadow-lg hover:shadow-2xl  transform transition-all duration-300 max-w-[400px]"
            >
                <Link
                    href="/organizations"
                    className="flex items-center justify-center gap-3 font-bold text-lg sm:text-xl"
                >
                    <FaBuilding className="text-2xl" />
                    Explore Organizations
                </Link>
                {/* <p className="text-sm mt-2 text-center">
                    Find the best organizations and their amazing repositories!
                </p> */}
            </div>
        </div>

    )
}

export default Explore