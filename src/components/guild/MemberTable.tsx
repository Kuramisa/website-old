import { useQuery } from "@apollo/client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { FetchMembers } from "../../gql/queries/guilds";

const MemberTable = ({ guild }: { guild: any }) => {
    const { loading, data: { members } = {} } = useQuery(FetchMembers, {
        variables: {
            guildId: guild.id,
            first: 5
        }
    });

    if (loading) return <></>;

    const columns: GridColDef[] = [
        { field: "memberUsername", headerName: "Username", width: 150, sortable: false }
    ];

    const rows = members.map((member: any, i: number) => ({
        id: i,
        memberUsername: member.user.tag
    }));

    return (
        <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[5]}></DataGrid>
    );
};

export default MemberTable;