import { Link } from "@nextui-org/react";

export default function Footer() {
    return (
        <div className="flex flex-col justify-center items-center mb-14">
            <p className="text-sm text-default-400 mb-2">Created by <Link href="https://github.com/mohaali482" target="_blank">Mohammed Ali Fenta</Link></p>
            <Link className="flex justify-center gap-2 mb-5" target="_blank" color="foreground" href="https://nextui.org">
                Powered by
                <svg className="data-[auto=true]:hidden data-[auto=true]:sm:block block text-foreground h-5 md:h-6" fill="currentColor" viewBox="0 0 100 24.48"><path d="M18.745 0v24.069h-2.139L2.386 3.914h-.188v20.155H0V0h2.127l14.267 20.179h.188V0zm13.256 24.445a7.934 7.934 0 01-4.371-1.181 7.79 7.79 0 01-2.85-3.279 11.069 11.069 0 01-1-4.836 11.2 11.2 0 011-4.848 8.1 8.1 0 012.785-3.326 7.175 7.175 0 014.119-1.2 7.689 7.689 0 012.832.535 7.042 7.042 0 012.45 1.634 7.836 7.836 0 011.722 2.756 11.015 11.015 0 01.635 3.931v1.034h-12.1V13.82h9.963a6.882 6.882 0 00-.7-3.132 5.55 5.55 0 00-1.939-2.2 5.11 5.11 0 00-2.862-.811 5.121 5.121 0 00-3.02.917 6.251 6.251 0 00-2.039 2.421 7.513 7.513 0 00-.746 3.291v1.1a8.822 8.822 0 00.746 3.755 5.751 5.751 0 002.124 2.487 5.9 5.9 0 003.255.881 5.873 5.873 0 002.251-.4 4.843 4.843 0 001.634-1.075 4.729 4.729 0 001-1.487l1.986.646a5.885 5.885 0 01-1.346 2.1 6.889 6.889 0 01-2.327 1.545 8.251 8.251 0 01-3.202.587zm12.74-18.428l4.654 7.7 4.654-7.7h2.433l-5.806 9.026 5.806 9.026H54.05l-4.654-7.451-4.655 7.451H42.32l5.735-9.026-5.735-9.026zm23.246 0v1.822h-8.615V6.017zm-5.923-4.325h2.1v17.664a3.414 3.414 0 00.388 1.769 2.159 2.159 0 001.011.9 3.363 3.363 0 001.328.264 4.045 4.045 0 00.705-.053q.294-.053.517-.112l.447 1.892a5.433 5.433 0 01-.752.217 5.162 5.162 0 01-1.1.1 5.1 5.1 0 01-2.215-.505 4.337 4.337 0 01-1.743-1.499 4.3 4.3 0 01-.682-2.48zM89.211 0h2.2v15.936a8.411 8.411 0 01-1.152 4.389 8.18 8.18 0 01-3.2 3.044 9.854 9.854 0 01-4.77 1.111 9.82 9.82 0 01-4.76-1.116 8.225 8.225 0 01-3.208-3.044 8.379 8.379 0 01-1.152-4.384V0h2.2v15.783a6.747 6.747 0 00.858 3.414 6.13 6.13 0 002.415 2.356 7.444 7.444 0 003.649.858 7.478 7.478 0 003.655-.858 6.08 6.08 0 002.413-2.353 6.784 6.784 0 00.852-3.414zM100 0v24.069h-2.2V0z"></path></svg>
            </Link>
            <Link className="flex justify-center gap-2" target="_blank" color="foreground" href="https://www.vercel.com?utm_source=nextui&amp;utm_marketing=oss">
                <p className="font-normal">Deployed on</p>
                <svg fill="none" height="18" viewBox="0 0 4438 1000" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white"><path d="M2223.75 250C2051.25 250 1926.87 362.5 1926.87 531.25C1926.87 700 2066.72 812.5 2239.38 812.5C2343.59 812.5 2435.47 771.25 2492.34 701.719L2372.81 632.656C2341.25 667.188 2293.28 687.344 2239.38 687.344C2164.53 687.344 2100.94 648.281 2077.34 585.781H2515.16C2518.59 568.281 2520.63 550.156 2520.63 531.094C2520.63 362.5 2396.41 250 2223.75 250ZM2076.09 476.562C2095.62 414.219 2149.06 375 2223.75 375C2298.59 375 2352.03 414.219 2371.41 476.562H2076.09ZM2040.78 78.125L1607.81 828.125L1174.69 78.125H1337.03L1607.66 546.875L1878.28 78.125H2040.78ZM577.344 0L1154.69 1000H0L577.344 0ZM3148.75 531.25C3148.75 625 3210 687.5 3305 687.5C3369.38 687.5 3417.66 658.281 3442.5 610.625L3562.5 679.844C3512.81 762.656 3419.69 812.5 3305 812.5C3132.34 812.5 3008.13 700 3008.13 531.25C3008.13 362.5 3132.5 250 3305 250C3419.69 250 3512.66 299.844 3562.5 382.656L3442.5 451.875C3417.66 404.219 3369.38 375 3305 375C3210.16 375 3148.75 437.5 3148.75 531.25ZM4437.5 78.125V796.875H4296.88V78.125H4437.5ZM3906.25 250C3733.75 250 3609.38 362.5 3609.38 531.25C3609.38 700 3749.38 812.5 3921.88 812.5C4026.09 812.5 4117.97 771.25 4174.84 701.719L4055.31 632.656C4023.75 667.188 3975.78 687.344 3921.88 687.344C3847.03 687.344 3783.44 648.281 3759.84 585.781H4197.66C4201.09 568.281 4203.12 550.156 4203.12 531.094C4203.12 362.5 4078.91 250 3906.25 250ZM3758.59 476.562C3778.13 414.219 3831.41 375 3906.25 375C3981.09 375 4034.53 414.219 4053.91 476.562H3758.59ZM2961.25 265.625V417.031C2945.63 412.5 2929.06 409.375 2911.25 409.375C2820.47 409.375 2755 471.875 2755 565.625V796.875H2614.38V265.625H2755V409.375C2755 330 2847.34 265.625 2961.25 265.625Z" fill="currentColor"></path></svg>
            </Link>
        </div>
    )
}