import React from 'react'
import { Sidebar } from './_componentes/sidebar/Sidebar'
import { OrgSidebar } from './_componentes/sidebar/OrgSidebar'
import Navbar from './_componentes/sidebar/Navbar'

const DashbordLayout = ({
    children,
}: {
    children: React.ReactNode,
}) => {
  return (
    <div className='h-full'>
        <Sidebar />
        <div className='pl-[60px] h-full'>
            <div className='flex gap-x-3 h-full'>
                <OrgSidebar />
                <div className='h-full flex-1'>
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashbordLayout
