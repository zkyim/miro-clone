"use client";
import { useOrganizationList } from '@clerk/clerk-react';
import React from 'react'
import { Item } from './Item';

export const List = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        }
    })
  return (
    <div className='space-y-4'>
      {userMemberships.data?.map((mem) => (
        <Item 
            id={mem.organization.id}
            key={mem.organization.id}
            name={mem.organization.name}
            imageUrl={mem.organization.imageUrl}
        />
      ))}
    </div>
  )
}
