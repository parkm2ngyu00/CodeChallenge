import Navbar from "../Navbar";
import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";



const Head = styled.p`
  display: flex;
	margin: 100px;
	justify-content: center;
  align-items: center;
	font-size:40px;
	marigin-top: 10vh;
`;

const Problem = styled.table`
  // display: flex;
	margin: auto;
	width : 80%
`;
const Modi = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius : 10px;
  border : none;
`;
const Del = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color : red;
  border-radius : 10px;
  border : none;
`;
const Append = styled.button`
display: flex;
justify-content: center;
align-items: center;
border-radius : 10px;
border : none;
`
const Td = styled.td`
	text-align : center;
`;

function Manager() {
  const [data, setdata] = useState([])
  const Delete = async (questionnum) => {
    const yesOrNo = window.confirm(`'${questionnum} 문제를 삭제하시겠습니까?`);
    if (yesOrNo == true) {
      axios.get(`/manager/del`, { params: { questionnum } }).then(function (response) {
        load()
      });
    }
  };
  const load = async () => {
    axios.get(`/manager/sel`, { params: { presenter: "hello" } }).then(function (response) {
      setdata(response.data)
    });
  };

  useEffect(() => {
    load()
  }, []);

  return (
    <>
      <Navbar />
      <Head>관리자 페이지</Head>
      <Link to={{ pathname: '/managerN' }}>문제추가</Link>
      <Problem>
        <thead>
          <tr>
            <th>문제 번호</th>
            <th>문제 이름</th>
            <th>시도횟수</th>
            <th>정답률</th>
            <th>관리</th>
          </tr>
        </thead>
        {/* <tbody>
            <tr>
            <Td>12345</Td>
            <Td>입,출력</Td>
            <Td>300</Td>
            <Td>50%</Td>
						<Td>
						<Link
              to={{
                pathname: `/managerM`,
								state:{questionnum : "1"}
              }}
            ><Modi>수정</Modi></Link>
						<Del onClick={()=>Delete("1")}>삭제</Del>
            </Td>
            </tr>
        </tbody> */}


        <tbody>
          {data?.map((v) => (
            <tr>
              <Td>{v.questionnum}</Td>
              <Td>{v.title}</Td>
              <Td>{v.trynum}</Td>
              <Td>{v.correctnum / v.trynum}</Td>
              <Td><Link
                to={{
                  pathname: `/managerM/`,
                  state: { questionnum: v.questionnum }
                }}
              ><Modi>수정</Modi></Link>
                <Del onClick={() => Delete(v.questionnum)}>삭제</Del>
                <Link to={{
                  pathname: `/testcase`,
                  state: { questionnum: v.questionnum }
                }}><Append>테스트케이스 수정</Append></Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Problem>
    </>
  )
}

export default Manager;