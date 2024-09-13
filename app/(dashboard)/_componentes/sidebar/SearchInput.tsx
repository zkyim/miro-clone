import React, { ChangeEvent, useEffect, useState } from 'react'

import qs from "query-string"
import { useDebounceValue } from "usehooks-ts"
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debounceValue = useDebounceValue(value, 500);

    const hadleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: debounceValue[0],
            },
        }, {skipEmptyString: true, skipNull: true});
        router.push(url);
    }, [debounceValue, router])

  return (
    <div className='w-full relative'>
      <Search  className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'/>
      <Input 
        onChange={hadleChange}
        className='w-full max-w-[516px] pl-9'
        placeholder='Search boards'
      />
    </div>
  )
}

export default SearchInput
