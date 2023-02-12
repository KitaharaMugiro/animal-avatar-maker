import { useEffect, useState } from "react"
import styled from 'styled-components';

export default () => {
    const [statusList, setStatusList] = useState([])
    useEffect(() => {
        const url = "/api/status/admin"
        fetch(url).then(res => res.json()).then(data => {
            const statusList = data.statusList
            setStatusList(statusList)
        })
    }, [])

    if (statusList.length === 0) return (<div>現在作成待ちのステータスはありません</div>)
    const headers = Object.keys(statusList[0]);
    return <div>
        <StyledTable>
            <thead>
                <tr>
                    {headers.map(header => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {statusList.map((item, index) => (
                    <tr key={index}>
                        {headers.map(header => (
                            <td key={header}>
                                {item[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </StyledTable>

        <a
            href="https://colab.research.google.com/drive/1HlFogmJlrv6LOq1SUvUf78SAPYxoPAKt#scrollTo=UoucDdEJ4Q5K&forceEdit=true&sandboxMode=true">
            <button
                className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                待っている人がいます。アバターを作りましょう。
            </button>
        </a>
    </div>
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th, td {
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td {
    border: 1px solid #ddd;
  }
`;