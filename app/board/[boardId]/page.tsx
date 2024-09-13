import React from 'react'
import { Canvas } from './_components/Canvas'
import { Room } from '@/components/Room';
import Loading from './_components/Loading';

interface BoardIdPgaeProps {
  params: {
    boardId: string;
  }
}

const BoardIdPgae = ({params}: BoardIdPgaeProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId}/>
    </Room>
  )
}

export default BoardIdPgae
