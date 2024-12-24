import { Avatar, Typography, List, ListItem, Divider } from '@mui/material'
import { Ellipsis } from '../../styles/StyledComponent'

function Postitem() {
   return (
      <List>
         <ListItem>
            <Typography variant="h6">날개</Typography>
         </ListItem>
         <ListItem>
            <Ellipsis>
               박제가 되어 버린 천재'를 아시오? 나는 유쾌하오. 이런 때 연애까지가 유쾌하오. 육신이
               흐느적 흐느적 하도록 피로했을 때만 정신이 은화처럼 맑소. 니코틴이 내 횟배 앓는
               뱃속으로스미면 머릿속에 으레 백지가 준비되는 법이오. 그 위에다 나는 위트와 파라독스를
               바둑 포석처럼 늘어놓소. 가증할 상식의 병이오. 나는 또 여인과 생활을 설계하오.
               연애기법에마저 서먹서먹해진 지성의 극치를 흘깃 좀 들여다 본 일이 있는, 말하자면
               일종의 정신분일자말이오. 이런 여인의 반-그것은 온갖 것의 반이오. - 만을 영수하는
               생활을 설계한다는 말이오. 그런 생활 속에 한 발만 들여놓고 흡사 두 개의 태양처럼 마주
               쳐다보면서 낄낄거리는 것이오. 나는 아마 어지간히 인생의 제행이 싱거워서 견딜 수가
               없게끔 되고 그만둔 모양이오. 굿바이. 굿바이. 그대는 이따금 그대가 제일 싫어하는
               음식을 탐식하는 아이로니를 실천해 보는 것도 놓을 것 같소. 위트와 파라독스와……. 그대
               자신을 위조하는 것도 할 만한 일이오.
            </Ellipsis>
         </ListItem>

         <ListItem>
            <Avatar sx={{ width: 24, height: 24, marginRight: 0.5 }} />
            이상
            <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
               2024-12-23
            </Typography>
         </ListItem>
         <Divider />
      </List>
   )
}

export default Postitem
