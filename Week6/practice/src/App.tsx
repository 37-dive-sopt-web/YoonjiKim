import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const getUserProfile = async (userId: number) => {
  // 입력한 id로 프로필 조회 요청
  const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}`)
  return response.data.data // 실제 프로필은 data.data에 담겨 있음
}

function App() {
  // 입력 필드 값(빈 문자열 허용)
  const [inputValue, setInputValue] = useState('9')
  // 실제로 조회할 ID
  const [userId, setUserId] = useState(9)
  // 버튼을 눌러야 실행되도록 제어
  const [shouldFetch, setShouldFetch] = useState(false)

  // 버튼 눌러야 실행되도록 enabled 사용
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserProfile(userId),  //// 입력한 id로 조건부 fetch 하기, 실제 요청하는 부분!
    enabled: shouldFetch, // shouldFetch가 true일 때만 요청 실행
  })

  const handleFetch = () => {
    if (!inputValue.trim()) return
    const parsed = Number(inputValue)
    if (Number.isNaN(parsed)) return
    setUserId(parsed) // 실제로 조회할 id 설정
    setShouldFetch(true) // 버튼 클릭 시에만 요청 나가도록
  }

  return (
    <div>
      <h1>유저 프로필</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value) // 입력 필드 값 변경
            setShouldFetch(false) // 타이핑 중에는 요청 안 나가도록
          }}
          placeholder="사용자 ID"
        />
        <button onClick={handleFetch}> {/* 조회가 잘 된다면? 버튼을 클릭하면 조회가 되게 해보자! */}
          데이터 가져오기
        </button>
      </div>

      {(isPending || isFetching) && shouldFetch && <div>로딩 중...</div>}
      {isError && <div>에러: {error.message}</div>}

      {data && (
        <div>
          <h2>ID: {data.id}</h2>
          <p>username: {data.username}</p>
          <p>name: {data.name}</p>
          <p>email: {data.email}</p>
          <p>age: {data.age}</p>
        </div>
      )}
    </div>
  )
}

export default App