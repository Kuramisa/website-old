import moment from "moment";
import { useQuery } from "@apollo/client";

// eslint-disable-next-line
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { FetchMembers } from "../../gql/queries/guilds";
import Avatar from "@mui/material/Avatar";

const MemberTable = ({ guild }: { guild: any }) => {
    const { loading, fetchMore, data: { members } = {} } = useQuery(FetchMembers, {
        variables: {
            guildId: guild.id,
            fetchDb: true,
            perPage: 5
        }
    });

    if (loading) return <></>;

    const loadMore = (page: number) => {
        fetchMore({
            variables: {
                page: page
            },
            updateQuery: (prev: any, { fetchMoreResult }: any) => {
                return Object.assign({}, {
                    members: {
                        data: [...fetchMoreResult.members.data],
                        count: fetchMoreResult.members.count
                    }
                });
            }
        });
    };

    const rows: GridRowsProp = members.data.map((member: any) => ({
        id: member.id,
        username: member.user.tag,
        joinedAt: member.joinedTimestamp ? `${moment(member.joinedTimestamp).format(
            "MMM Do YY h:mm A"
        )} (${moment(member.joinedTimestamp).fromNow()})` : "Unknown"
    }));

    const UsernameCell = ({ row }: any) => {
        const member = members.data.find((m: any) => m.user.tag === row.value);
        return (
            <div className="avatar-cell">
                {member.avatarURL ? (
                    <Avatar src={member.avatarURL} />
                ) : (
                    <Avatar>{member.user.username[0]}</Avatar>
                )}
                <span>{member.user.tag}</span>
            </div>
        );
    };

    const columns: GridColDef[] = [
        {
            field: "username",
            headerName: "Username",
            width: 200,
            sortable: false,
            renderCell: (row) => <UsernameCell row={row} />
        },
        { field: "joinedAt", headerName: "Joined", width: 250, sortable: false }
    ];

    return (
        <div className="member-table">
            <DataGrid
                columns={columns}
                rows={rows}
                pagination
                pageSize={5}
                onPageChange={loadMore}
                rowCount={members.count}
                rowHeight={55}
                paginationMode="server"
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disableColumnFilter
            />
        </div>
    );
};

export default MemberTable;