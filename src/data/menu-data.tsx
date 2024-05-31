import { AiFillCalendar } from 'react-icons/ai';
import { PiGitBranchBold } from 'react-icons/pi';
import { GrCheckmark } from 'react-icons/gr';
import {
    BsQuestionLg,
    BsFilm,
    BsFillFileEarmarkTextFill,
} from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { SiWechat } from 'react-icons/si';
import { BiSolidServer, BiSolidBook } from 'react-icons/bi';
import { LiaGreaterThanEqualSolid } from 'react-icons/lia';
import { GiSpanner } from 'react-icons/gi';
import { MdGroups } from 'react-icons/md';

export const navLinks = [
    {
        name: 'My planning',
        path: '/planning/me',
        icon: <AiFillCalendar />,
    },
    {
        name: 'Projects',
        path: '/projects/current',
        icon: <PiGitBranchBold />,
    },
    {
        name: 'QA Reviews I can make',
        path: '/corrections/to_review',
        icon: <GrCheckmark />,
    },
    {
        name: 'Evaluation Quizzes',
        path: '/dashboards/my_current_evaluation_quizzes',
        icon: <BsQuestionLg />,
    },
    {
        name: 'Curriculums',
        path: '/dashboards/my_curriculums',
        icon: <FaGraduationCap />,
    },
    {
        name: 'Concepts',
        path: '/concepts',
        icon: <BsFillFileEarmarkTextFill />,
    },
    {
        name: 'Conference rooms',
        path: '/dashboards/video_rooms',
        icon: <SiWechat />,
    },
    {
        name: 'Servers',
        path: '/servers',
        icon: <BiSolidServer />,
    },
    {
        name: 'Sandboxes',
        path: '/user_containers/current',
        icon: <LiaGreaterThanEqualSolid />,
    },
    {
        name: 'Tools',
        path: '/my_tools',
        icon: <GiSpanner />,
    },
    {
        name: 'Video on Demands',
        path: '/dashboards/videos',
        icon: <BsFilm />,
    },
    {
        name: 'Peers',
        path: '/peers',
        icon: <MdGroups />,
    },
    {
        name: 'Captains log',
        path: '/my_captain_log',
        icon: <BiSolidBook />,
    },
];
