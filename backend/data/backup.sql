--
-- PostgreSQL database dump
--

\restrict 9eU3ssJhsJRENYE9xQjAj6nWcIxOQqVQW4qqHRV89a29rlEjanBkvVQzLsV5fs0

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: anime_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anime_genres (
    anime_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.anime_genres OWNER TO postgres;

--
-- Name: animes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animes (
    id integer NOT NULL,
    mal_id integer,
    title character varying(255) NOT NULL,
    title_english character varying(255),
    title_japanese character varying(255),
    synopsis text,
    type character varying(20),
    source character varying(50),
    episodes integer,
    status character varying(30),
    airing boolean DEFAULT false,
    aired_from date,
    aired_to date,
    duration character varying(50),
    rating character varying(50),
    score numeric(4,2),
    scored_by integer,
    rank integer,
    popularity integer,
    members integer,
    season character varying(10),
    year integer,
    image_url text,
    trailer_url text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.animes OWNER TO postgres;

--
-- Name: animes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animes_id_seq OWNER TO postgres;

--
-- Name: animes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animes_id_seq OWNED BY public.animes.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    anime_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: episodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.episodes (
    id integer NOT NULL,
    mal_id integer,
    anime_id integer NOT NULL,
    number integer NOT NULL,
    title character varying(255),
    title_japanese character varying(255),
    title_romanji character varying(255),
    aired date,
    filler boolean DEFAULT false,
    recap boolean DEFAULT false,
    duration integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.episodes OWNER TO postgres;

--
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.episodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.episodes_id_seq OWNER TO postgres;

--
-- Name: episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.episodes_id_seq OWNED BY public.episodes.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    anime_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    mal_id integer,
    name character varying(50) NOT NULL
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_id_seq OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: animes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes ALTER COLUMN id SET DEFAULT nextval('public.animes_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: episodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes ALTER COLUMN id SET DEFAULT nextval('public.episodes_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: anime_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anime_genres (anime_id, genre_id) FROM stdin;
\.


--
-- Data for Name: animes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animes (id, mal_id, title, title_english, title_japanese, synopsis, type, source, episodes, status, airing, aired_from, aired_to, duration, rating, score, scored_by, rank, popularity, members, season, year, image_url, trailer_url, created_at, updated_at) FROM stdin;
1	64467	Sudachi no Maoujou	\N	すだちの魔王城	After the hero defeated the demon lord, the world is finally at peace... leaving the young Villager of Beginnerville in a bind! Without a demon lord to defeat, people have no need for potions and items...leaving Villager's item shop, The Nest, empty and lifeless. At this rate, Villager might have to close The Nest...! But then suddenly a mysterious girl appears and everything changes...\n\n(Source: Kodansha)	TV	\N	\N	Not yet aired	f	2027-01-01	\N	Unknown	\N	0.00	0	0	0	1	winter	2027	https://cdn.myanimelist.net/images/anime/1934/158698l.jpg	\N	2026-06-25 16:12:38.210687	2026-06-25 16:12:38.210687
2	64468	Gokigen You, Ikkyoku Ikaga?	\N	ごきげんよう、一局いかが？	Sae finds it difficult to fit in at a prestigious girls' high school. During lunch break, she secretly plays mahjong on an app by herself. Until one day, Chise, the most charismatic young lady in the school, finds out about it! Will Sae be able to show her through the wonders of mahjong?\n\n(Source: Houbunsha)	TV	\N	\N	Not yet aired	f	\N	\N	Unknown	\N	0.00	0	0	0	0	\N	\N	https://cdn.myanimelist.net/images/anime/1796/158701l.jpg	\N	2026-06-25 16:12:38.274699	2026-06-25 16:12:38.274699
3	16498	Shingeki no Kyojin	Attack on Titan	進撃の巨人	Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\n\nAfter witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Eren, his adopted sister Mikasa Ackerman, and his childhood friend Armin Arlert join the brutal war against the Titans and race to discover a way of defeating them before the last walls are breached.\n\n[Written by MAL Rewrite]	TV	\N	25	Finished Airing	f	2013-04-07	2013-09-29	24 min per ep	R - 17+ (violence & profanity)	8.57	3083216	127	1	4384773	spring	2013	https://cdn.myanimelist.net/images/anime/10/47347l.jpg	https://www.youtube-nocookie.com/embed/LHtdKWJdif4?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.282386	2026-06-25 16:12:38.282386
4	1535	Death Note	Death Note	デスノート	Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den. The ingenious 17-year-old Japanese student Light Yagami and sadistic god of death Ryuk share one belief: their worlds are rotten.\n\nFor his own amusement, Ryuk drops his Death Note into the human world. Light stumbles upon it, deeming the first of its rules ridiculous: the human whose name is written in this note shall die. However, the temptation is too great, and Light experiments by writing a felon's name, which disturbingly enacts his first murder.\n\nAware of the terrifying godlike power that has fallen into his hands, Light—under the alias Kira—follows his wicked sense of justice with the ultimate goal of cleansing the world of all evil-doers. The meticulous mastermind detective L is already on his trail, but as Light's brilliance rivals L's, the grand chase for Kira turns into an intense battle of wits that can only end when one of them is dead.\n\n[Written by MAL Rewrite]	TV	\N	37	Finished Airing	f	2006-10-04	2007-06-27	23 min per ep	R - 17+ (violence & profanity)	8.62	3021455	97	2	4322363	fall	2006	https://cdn.myanimelist.net/images/anime/1079/138100l.jpg	https://www.youtube-nocookie.com/embed/Vt_3c8BgxV4?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.290269	2026-06-25 16:12:38.290269
5	5114	Fullmetal Alchemist: Brotherhood	Fullmetal Alchemist: Brotherhood	鋼の錬金術師 FULLMETAL ALCHEMIST	After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.\n\nThe brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry. Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing "automail," a tough, versatile metal used in robots and combat armor. After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher's Stone—a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange.\n\nAs Edward becomes an infamous alchemist and gains the nickname "Fullmetal," the boys' journey embroils them in a growing conspiracy that threatens the fate of the world.\n\n[Written by MAL Rewrite]	TV	\N	64	Finished Airing	f	2009-04-05	2010-07-04	24 min per ep	R - 17+ (violence & profanity)	9.11	2322434	3	3	3702169	spring	2009	https://cdn.myanimelist.net/images/anime/1208/94745l.jpg	https://www.youtube-nocookie.com/embed/1ac3_YdSSy0?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.29935	2026-06-25 16:12:38.29935
6	30276	One Punch Man	One-Punch Man	ワンパンマン	The seemingly unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, Saitama relentlessly trained for three years, losing all of his hair in the process. Now, Saitama is so powerful, he can defeat any enemy with just one punch. However, having no one capable of matching his strength has led Saitama to an unexpected problem—he is no longer able to enjoy the thrill of battling and has become quite bored.\n\nOne day, Saitama catches the attention of 19-year-old cyborg Genos, who witnesses his power and wishes to become Saitama's disciple. Genos proposes that the two join the Hero Association in order to become certified heroes that will be recognized for their positive contributions to society. Saitama, who is shocked that no one knows who he is, quickly agrees. Meeting new allies and taking on new foes, Saitama embarks on a new journey as a member of the Hero Association to experience the excitement of battle he once felt.\n\n[Written by MAL Rewrite]	TV	\N	12	Finished Airing	f	2015-10-05	2015-12-21	24 min per ep	R - 17+ (violence & profanity)	8.47	2431801	182	4	3534403	fall	2015	https://cdn.myanimelist.net/images/anime/12/76049l.jpg	https://www.youtube-nocookie.com/embed/ExUMiF1L0HA?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.308087	2026-06-25 16:12:38.308087
7	38000	Kimetsu no Yaiba	Demon Slayer: Kimetsu no Yaiba	鬼滅の刃	Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.\n\nWhen he finally arrives back home the next day, he is met with a horrifying sight—his whole family has been slaughtered. Worse still, the sole survivor is his sister Nezuko, who has been turned into a bloodthirsty demon. Consumed by rage and hatred, Tanjirou swears to avenge his family and stay by his only remaining sibling. Alongside the mysterious group calling themselves the Demon Slayer Corps, Tanjirou will do whatever it takes to slay the demons and protect the remnants of his beloved sister's humanity.\n\n[Written by MAL Rewrite]	TV	\N	26	Finished Airing	f	2019-04-06	2019-09-28	23 min per ep	R - 17+ (violence & profanity)	8.40	2378006	229	5	3469578	spring	2019	https://cdn.myanimelist.net/images/anime/1286/99889l.jpg	https://www.youtube-nocookie.com/embed/6vMuWuWlW4I?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.317197	2026-06-25 16:12:38.317197
8	31964	Boku no Hero Academia	My Hero Academia	僕のヒーローアカデミア	The appearance of "quirks," newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.\n\nSince he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might's quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor!\n\nEnduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year's freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.\n\n[Written by MAL Rewrite]	TV	\N	13	Finished Airing	f	2016-04-03	2016-06-26	24 min per ep	PG-13 - Teens 13 or older	7.82	2249580	1097	6	3322339	spring	2016	https://cdn.myanimelist.net/images/anime/10/78745l.jpg	https://www.youtube-nocookie.com/embed/D5fYOnwYkj4?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.326803	2026-06-25 16:12:38.326803
9	11757	Sword Art Online	Sword Art Online	ソードアート・オンライン	Ever since the release of the innovative NerveGear, gamers from all around the globe have been given the opportunity to experience a completely immersive virtual reality. Sword Art Online (SAO), one of the most recent games on the console, offers a gateway into the wondrous world of Aincrad, a vivid, medieval landscape where users can do anything within the limits of imagination. With the release of this worldwide sensation, gaming has never felt more lifelike.\n\nHowever, the idyllic fantasy rapidly becomes a brutal nightmare when SAO's creator traps thousands of players inside the game. The "log-out" function has been removed, with the only method of escape involving beating all of Aincrad's one hundred increasingly difficult levels. Adding to the struggle, any in-game death becomes permanent, ending the player's life in the real world.\n\nWhile Kazuto "Kirito" Kirigaya was fortunate enough to be a beta-tester for the game, he quickly finds that despite his advantages, he cannot overcome SAO's challenges alone. Teaming up with Asuna Yuuki and other talented players, Kirito makes an effort to face the seemingly insurmountable trials head-on. But with difficult bosses and threatening dark cults impeding his progress, Kirito finds that such tasks are much easier said than done.\n\n[Written by MAL Rewrite]	TV	\N	25	Finished Airing	f	2012-07-08	2012-12-23	23 min per ep	PG-13 - Teens 13 or older	7.23	2287752	3527	7	3312449	summer	2012	https://cdn.myanimelist.net/images/anime/11/39717l.jpg	https://www.youtube-nocookie.com/embed/6ohYYtxfDCg?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.335236	2026-06-25 16:12:38.335236
10	11061	Hunter x Hunter (2011)	Hunter x Hunter	HUNTER×HUNTER（ハンター×ハンター）	Hunters devote themselves to accomplishing hazardous tasks, all from traversing the world's uncharted territories to locating rare items and monsters. Before becoming a Hunter, one must pass the Hunter Examination—a high-risk selection process in which most applicants end up handicapped or worse, deceased.\n\nAmbitious participants who challenge the notorious exam carry their own reason. What drives 12-year-old Gon Freecss is finding Ging, his father and a Hunter himself. Believing that he will meet his father by becoming a Hunter, Gon takes the first step to walk the same path.\n\nDuring the Hunter Examination, Gon befriends the medical student Leorio Paladiknight, the vindictive Kurapika, and ex-assassin Killua Zoldyck. While their motives vastly differ from each other, they band together for a common goal and begin to venture into a perilous world.\n\n[Written by MAL Rewrite]	TV	\N	148	Finished Airing	f	2011-10-02	2014-09-24	23 min per ep	PG-13 - Teens 13 or older	9.03	1991367	10	8	3207432	fall	2011	https://cdn.myanimelist.net/images/anime/1337/99013l.jpg	https://www.youtube-nocookie.com/embed/D9iTQRB4XRk?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.34335	2026-06-25 16:12:38.34335
11	20	Naruto	Naruto	ナルト	Twelve years ago, a colossal demon fox terrorized the world. During the monster's attack on the Hidden Leaf Village, the Hokage—the village's leader and most powerful ninja—sacrifices himself to seal the beast inside a newborn, relieving civilization from destruction while dooming the baby to a lonely life.\n\nNow, after years of being shunned and bullied, Naruto Uzumaki pesters the village with elaborate pranks and vandalism. Despite these antics, he works hard to achieve his dream: to become the Hokage and earn the acknowledgement of those who have mistreated him for his entire life. Naruto joins Team 7, a ninja squad made up of two of his peers—prodigy Sasuke Uchiha and clever Sakura Haruno.\n\nUnder the aloof Kakashi Hatake's leadership, Team 7 takes on a series of difficult missions, forcing its members to grow in strength and comradery despite their many differences. Naruto strives to stand out in his rivalry with Sasuke and earn the romantic affection of Sakura. But as the trio brush against danger and death, their tragic pasts threaten to tear them apart.\n\n[Written by MAL Rewrite]	TV	\N	220	Finished Airing	f	2002-10-03	2007-02-08	23 min per ep	PG-13 - Teens 13 or older	8.02	2151334	712	9	3132209	fall	2002	https://cdn.myanimelist.net/images/anime/1141/142503l.jpg	\N	2026-06-25 16:12:38.350014	2026-06-25 16:12:38.350014
12	22319	Tokyo Ghoul	Tokyo Ghoul	東京喰種-トーキョーグール-	A sinister threat is invading Tokyo: flesh-eating "ghouls" who appear identical to humans and blend into their population. Reserved college student Ken Kaneki buries his nose in books and avoids the news of the growing crisis. However, the appearance of an attractive woman named Rize Kamishiro shatters his solitude when she forwardly asks him on a date.\n\nWhile walking Rize home, Kaneki discovers she isn't as kind as she first appeared, and she has led him on with sinister intent. After a tragic struggle, he later awakens in a hospital to learn his life was saved by transplanting the now deceased Rize's organs into his own body.\n\nKaneki's body begins to change in horrifying ways, and he transforms into a human-ghoul hybrid. As he embarks on his new dreadful journey, Kaneki clings to his humanity in the evolving bloody conflict between society's new monsters and the government agents who hunt them.\n\n[Written by MAL Rewrite]	TV	\N	12	Finished Airing	f	2014-07-04	2014-09-19	24 min per ep	R - 17+ (violence & profanity)	7.79	2010593	1187	10	3069412	summer	2014	https://cdn.myanimelist.net/images/anime/1498/134443l.jpg	https://www.youtube-nocookie.com/embed/vGuQeQsoRgU?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.356916	2026-06-25 16:12:38.356916
13	40748	Jujutsu Kaisen	Jujutsu Kaisen	呪術廻戦	Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the King of Curses.\n\nYuuji experiences first-hand the threat these Curses pose to society as he discovers his own newfound powers. Introduced to the Tokyo Prefectural Jujutsu High School, he begins to walk down a path from which he cannot return—the path of a Jujutsu sorcerer.\n\n[Written by MAL Rewrite]	TV	\N	24	Finished Airing	f	2020-10-03	2021-03-27	23 min per ep	R - 17+ (violence & profanity)	8.50	2018928	165	11	3062962	fall	2020	https://cdn.myanimelist.net/images/anime/1171/109222l.jpg	https://www.youtube-nocookie.com/embed/4A_X-Dvl0ws?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.364325	2026-06-25 16:12:38.364325
14	32281	Kimi no Na wa.	Your Name.	君の名は。	Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside. Meanwhile in the city, Taki Tachibana lives a busy life as a high school student while juggling his part-time job and hopes for a future in architecture.\n\nOne day, Mitsuha awakens in a room that is not her own and suddenly finds herself living the dream life in Tokyo—but in Taki's body! Elsewhere, Taki finds himself living Mitsuha's life in the humble countryside. In pursuit of an answer to this strange phenomenon, they begin to search for one another.\n\nKimi no Na wa. revolves around Mitsuha and Taki's actions, which begin to have a dramatic impact on each other's lives, weaving them into a fabric held together by fate and circumstance.\n\n[Written by MAL Rewrite]	Movie	\N	1	Finished Airing	f	2016-08-26	\N	1 hr 46 min	PG-13 - Teens 13 or older	8.82	2093160	36	12	3042401	\N	\N	https://cdn.myanimelist.net/images/anime/5/87048l.jpg	https://www.youtube-nocookie.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.372223	2026-06-25 16:12:38.372223
15	25777	Shingeki no Kyojin Season 2	Attack on Titan Season 2	進撃の巨人 Season2	For centuries, humanity has been hunted by giant, mysterious predators known as the Titans. Three mighty walls—Wall Maria, Rose, and Sheena—provided peace and protection for humanity for over a hundred years. That peace, however, was shattered when the Colossal Titan and Armored Titan appeared and destroyed the outermost wall, Wall Maria. Forced to retreat behind Wall Rose, humanity waited with bated breath for the Titans to reappear and destroy their safe haven once more.\n\nIn Shingeki no Kyojin Season 2, Eren Yeager and others of the 104th Training Corps have just begun to become full members of the Survey Corps. As they ready themselves to face the Titans once again, their preparations are interrupted by the invasion of Wall Rose—but all is not as it seems as more mysteries are unraveled. As the Survey Corps races to save the wall, they uncover more about the invading Titans and the dark secrets of their own members.\n\n[Written by MAL Rewrite]	TV	\N	12	Finished Airing	f	2017-04-01	2017-06-17	24 min per ep	R - 17+ (violence & profanity)	8.54	2076621	143	13	3036702	spring	2017	https://cdn.myanimelist.net/images/anime/4/84177l.jpg	https://www.youtube-nocookie.com/embed/zLaVP8IhIuc?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.380305	2026-06-25 16:12:38.380305
16	9253	Steins;Gate	Steins;Gate	STEINS;GATE	Eccentric scientist Rintarou Okabe has a never-ending thirst for scientific exploration. Together with his ditzy but well-meaning friend Mayuri Shiina and his roommate Itaru Hashida, Okabe founds the Future Gadget Laboratory in the hopes of creating technological innovations that baffle the human psyche. Despite claims of grandeur, the only notable "gadget" the trio have created is a microwave that has the mystifying power to turn bananas into green goo.\n\nHowever, when Okabe attends a conference on time travel, he experiences a series of strange events that lead him to believe that there is more to the "Phone Microwave" gadget than meets the eye. Apparently able to send text messages into the past using the microwave, Okabe dabbles further with the "time machine," attracting the ire and attention of the mysterious organization SERN.\n\nDue to the novel discovery, Okabe and his friends find themselves in an ever-present danger. As he works to mitigate the damage his invention has caused to the timeline, Okabe fights a battle to not only save his loved ones but also to preserve his degrading sanity.\n\n[Written by MAL Rewrite]	TV	\N	24	Finished Airing	f	2011-04-06	2011-09-14	24 min per ep	PG-13 - Teens 13 or older	9.07	1527780	6	14	2827044	spring	2011	https://cdn.myanimelist.net/images/anime/1935/127974l.jpg	https://www.youtube-nocookie.com/embed/27OZc-ku6is?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.387418	2026-06-25 16:12:38.387418
17	1735	Naruto: Shippuuden	Naruto Shippuden	-ナルト- 疾風伝	It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n \nAlthough Naruto is older and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation of the saga about the boy who wishes to become Hokage.\n\n[Written by MAL Rewrite]	TV	\N	500	Finished Airing	f	2007-02-15	2017-03-23	23 min per ep	PG-13 - Teens 13 or older	8.29	1832831	338	15	2762309	winter	2007	https://cdn.myanimelist.net/images/anime/1565/111305l.jpg	https://www.youtube-nocookie.com/embed/1dy2zPPrKD0?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.395394	2026-06-25 16:12:38.395394
18	33486	Boku no Hero Academia 2nd Season	My Hero Academia Season 2	僕のヒーローアカデミア	At UA Academy, not even a violent attack can disrupt their most prestigious event: the school sports festival. Renowned across Japan, this festival is an opportunity for aspiring heroes to showcase their abilities, both to the public and potential recruiters.\n\nHowever, the path to glory is never easy, especially for Izuku Midoriya—whose quirk possesses great raw power but is also cripplingly inefficient. Pitted against his talented classmates, such as the fire and ice wielding Shouto Todoroki, Izuku must utilize his sharp wits and master his surroundings to achieve victory and prove to the world his worth.\n\n[Written by MAL Rewrite]	TV	\N	25	Finished Airing	f	2017-04-01	2017-09-30	23 min per ep	PG-13 - Teens 13 or older	8.04	1861617	674	16	2745586	spring	2017	https://cdn.myanimelist.net/images/anime/12/85221l.jpg	https://www.youtube-nocookie.com/embed/HoIOW6no_Ew?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.402955	2026-06-25 16:12:38.402955
19	21	One Piece	One Piece	ONE PIECE	Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.\n\nThe late King of the Pirates, Gol D. Roger, stirred up the world before his death by disclosing the whereabouts of his hoard of riches and daring everyone to obtain it. Ever since then, countless powerful pirates have sailed dangerous seas for the prized One Piece only to never return. Although Luffy lacks a crew and a proper ship, he is endowed with a superhuman ability and an unbreakable spirit that make him not only a formidable adversary but also an inspiration to many.\n\nAs he faces numerous challenges with a big smile on his face, Luffy gathers one-of-a-kind companions to join him in his ambitious endeavor, together embracing perils and wonders on their once-in-a-lifetime adventure.\n\n[Written by MAL Rewrite]	TV	\N	\N	Currently Airing	f	1999-10-20	\N	24 min	PG-13 - Teens 13 or older	8.73	1540352	54	17	2697795	fall	1999	https://cdn.myanimelist.net/images/anime/1244/138851l.jpg	https://www.youtube-nocookie.com/embed/-tviZNY6CSw?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.410689	2026-06-25 16:12:38.410689
20	35760	Shingeki no Kyojin Season 3	Attack on Titan Season 3	進撃の巨人 Season3	Still threatened by the "Titans" that rob them of their freedom, mankind remains caged inside the two remaining walls. Efforts to eradicate these monsters continue; however, threats arise not only from the Titans beyond the walls, but from the humans within them as well.\n\nAfter being rescued from the Colossal and Armored Titans, Eren Yaeger devotes himself to improving his Titan form. Krista Lenz struggles to accept the loss of her friend, Captain Levi chooses Eren and his friends to form his new personal squad, and Commander Erwin Smith recovers from his injuries. All seems well for the soldiers, until the government suddenly demands custody of Eren and Krista. The Survey Corps' recent successes have drawn attention, and a familiar face from Levi's past is sent to collect the wanted soldiers. Sought after by the government, Levi and his new squad must evade their adversaries in hopes of keeping Eren and Krista safe.\n\nEren and his fellow soldiers are not only fighting for their survival against the terrifying Titans, but also against the terror of a far more conniving foe: their fellow humans.\n\n[Written by MAL Rewrite]	TV	\N	12	Finished Airing	f	2018-07-23	2018-10-15	23 min per ep	R - 17+ (violence & profanity)	8.65	1822637	86	18	2682764	summer	2018	https://cdn.myanimelist.net/images/anime/1173/92110l.jpg	https://www.youtube-nocookie.com/embed/EHzBhrncmac?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.41751	2026-06-25 16:12:38.41751
21	28851	Koe no Katachi	A Silent Voice	聲の形	As a wild youth, elementary school student Shouya Ishida sought to beat boredom in the cruelest ways. When the deaf Shouko Nishimiya transfers into his class, Shouya and the rest of his class thoughtlessly bully her for fun. However, when her mother notifies the school, he is singled out and blamed for everything done to her. With Shouko transferring out of the school, Shouya is left at the mercy of his classmates. He is heartlessly ostracized all throughout elementary and middle school, while teachers turn a blind eye.\n\nNow in his third year of high school, Shouya is still plagued by his wrongdoings as a young boy. Sincerely regretting his past actions, he sets out on a journey of redemption: to meet Shouko once more and make amends.\n\nKoe no Katachi tells the heartwarming tale of Shouya's reunion with Shouko and his honest attempts to redeem himself, all while being continually haunted by the shadows of his past.\n \n[Written by MAL Rewrite]	Movie	\N	1	Finished Airing	f	2016-09-17	\N	2 hr 10 min	PG-13 - Teens 13 or older	8.93	1810592	21	19	2632617	\N	\N	https://cdn.myanimelist.net/images/anime/1122/96435l.jpg	https://www.youtube-nocookie.com/embed/XBNWo25izJ8?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.424309	2026-06-25 16:12:38.424309
22	38524	Shingeki no Kyojin Season 3 Part 2	Attack on Titan Season 3 Part 2	進撃の巨人 Season3 Part.2	Seeking to restore humanity's diminishing hope, the Survey Corps embark on a mission to retake Wall Maria, where the battle against the merciless "Titans" takes the stage once again.\n\nReturning to the tattered Shiganshina District that was once his home, Eren Yeager and the Corps find the town oddly unoccupied by Titans. Even after the outer gate is plugged, they strangely encounter no opposition. The mission progresses smoothly until Armin Arlert, highly suspicious of the enemy's absence, discovers distressing signs of a potential scheme against them. \n\nShingeki no Kyojin Season 3 Part 2 follows Eren as he vows to take back everything that was once his. Alongside him, the Survey Corps strive—through countless sacrifices—to carve a path towards victory and uncover the secrets locked away in the Yeager family's basement.\n\n[Written by MAL Rewrite]	TV	\N	10	Finished Airing	f	2019-04-29	2019-07-01	23 min per ep	R - 17+ (violence & profanity)	9.05	1805105	9	20	2610205	spring	2019	https://cdn.myanimelist.net/images/anime/1517/100633l.jpg	https://www.youtube-nocookie.com/embed/hKHepjfj5Tw?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.430898	2026-06-25 16:12:38.430898
23	19815	No Game No Life	No Game, No Life	ノーゲーム・ノーライフ	Sixteen sentient races inhabit Disboard, a world overseen by Tet, the One True God. The lowest of the sixteen—Imanity—consists of humans, a race with no affinity for magic. In a place where everything is decided through simple games, humankind seems to have no way out of their predicament—but the arrival of two outsiders poses a change.\n\nOn Earth, stepsiblings Sora and Shiro are two inseparable shut-ins who dominate various online games under the username "Blank." While notorious on the internet, the pair believe that life is merely another dull game. However, after responding to a message from an unknown user, they are suddenly transported to Disboard. The mysterious sender turns out to be Tet, who informs them about the world's absolute rules. After Tet leaves, Sora and Shiro begin their search for more information and a place to stay, taking them to Elkia—Imanity's only remaining kingdom.\n\nThere, the duo encounters Stephanie Dola, an emotional girl vying for the kingdom's sovereignty. In desperation, she attempts to regain her father's throne, but her foolhardiness makes her goal unachievable. Inspired by the girl's motivation and passion, Sora and Shiro decide to aid Stephanie in getting Elkia back on its feet, ultimately aiming to become the new rulers of the enigmatic realm.\n\n[Written by MAL Rewrite]	TV	\N	12	Finished Airing	f	2014-04-09	2014-06-25	23 min per ep	PG-13 - Teens 13 or older	8.03	1629751	700	21	2567085	spring	2014	https://cdn.myanimelist.net/images/anime/1074/111944l.jpg	https://www.youtube-nocookie.com/embed/fV7nGIUuyzA?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.438003	2026-06-25 16:12:38.438003
24	1575	Code Geass: Hangyaku no Lelouch	Code Geass: Lelouch of the Rebellion	コードギアス 反逆のルルーシュ	In the year 2010, the Holy Empire of Britannia is establishing itself as a dominant military nation, starting with the conquest of Japan. Renamed to Area 11 after its swift defeat, Japan has seen significant resistance against these tyrants in an attempt to regain independence.\n\nLelouch Lamperouge, a Britannian student, unfortunately finds himself caught in a crossfire between the Britannian and the Area 11 rebel armed forces. He is able to escape, however, thanks to the timely appearance of a mysterious girl named C.C., who bestows upon him Geass, the "Power of Kings." Realizing the vast potential of his newfound "power of absolute obedience," Lelouch embarks upon a perilous journey as the masked vigilante known as Zero, leading a merciless onslaught against Britannia in order to get revenge once and for all.\n\n[Written by MAL Rewrite]	TV	\N	25	Finished Airing	f	2006-10-06	2007-07-29	24 min per ep	R+ - Mild Nudity	8.71	1530459	61	22	2485754	fall	2006	https://cdn.myanimelist.net/images/anime/1032/135088l.jpg	\N	2026-06-25 16:12:38.445802	2026-06-25 16:12:38.445802
25	31240	Re:Zero kara Hajimeru Isekai Seikatsu	Re:ZERO -Starting Life in Another World-	Re:ゼロから始める異世界生活	When Subaru Natsuki leaves the convenience store, the last thing he expects is to be wrenched from his everyday life and dropped into a fantasy world. Things are not looking good for the bewildered teenager; however, not long after his arrival, he is attacked by some thugs. Armed with only a bag of groceries and a now useless cell phone, he is quickly beaten to a pulp. Fortunately, a mysterious beauty named Satella, in hot pursuit after the one who stole her insignia, happens upon Subaru and saves him. In order to thank the honest and kindhearted girl, Subaru offers to help in her search, and later that night, he even finds the whereabouts of that which she seeks. But unbeknownst to them, a much darker force stalks the pair from the shadows, and just minutes after locating the insignia, Subaru and Satella are brutally murdered.\n\nHowever, Subaru immediately reawakens to a familiar scene—confronted by the same group of thugs, meeting Satella all over again—the enigma deepens as history inexplicably repeats itself.\n\n[Written by MAL Rewrite]	TV	\N	25	Finished Airing	f	2016-04-04	2016-09-19	26 min per ep	R - 17+ (violence & profanity)	8.25	1580203	386	23	2478648	spring	2016	https://cdn.myanimelist.net/images/anime/1522/128039l.jpg	https://www.youtube-nocookie.com/embed/vFfXjuVA1Jk?enablejsapi=1&wmode=opaque&autoplay=1	2026-06-25 16:12:38.454539	2026-06-25 16:12:38.454539
31	76	Mahou Shoujo Lyrical Nanoha	Magical Girl Lyrical Nanoha	魔法少女リリカルなのは	Nanoha Takamachi, an ordinary third-grader who enjoys spending time with her family and friends, rescues an injured ferret that she had dreamed about the night before. The next day, the ferret cries out to her telepathically, asking Nanoha to save him. The ferret reveals himself to be Yuuno Scrya, a mage from another world who is trying to collect the dangerous 21 Jewel Seeds that he accidentally scattered across the world. He enlists Nanoha's help, gifting her the magical wand Raising Heart, and teaches her how to become a powerful mage.\n\nDays later, after reclaiming a few of the Jewel Seeds, another mage appears: Fate Testarossa. Stronger than Nanoha, Fate refuses to divulge her reasons in trying to collect the Jewel Seeds. Nanoha senses a melancholy in her eyes, but Fate refuses to communicate. Directed by Akiyuki Shinbo, Mahou Shoujo Lyrical Nanoha is a story about the clash of emotions when goals collide.\n\n[Written by MAL Rewrite]	TV	\N	13	Finished Airing	f	2004-10-03	2004-12-26	25 min per ep	PG-13 - Teens 13 or older	7.42	44222	2512	2237	111380	fall	2004	https://cdn.myanimelist.net/images/anime/1052/136283l.jpg	\N	2026-06-25 17:49:50.711953	2026-06-25 17:49:50.711953
26	77	Mahou Shoujo Lyrical Nanoha A's	Magical Girl Lyrical Nanoha A's	魔法少女リリカルなのは エース	After solving the incident of the scattered Jewel Seeds, Nanoha Takamachi happily returns to her everyday life, though now with added magic practice in the morning. Exchanging video messages with Fate Testarossa and the crew of the Arthra, Nanoha eagerly awaits the chance to speak with them in person again. But while studying in her room one day, Raising Heart suddenly calls out to Nanoha and warns her of an incoming attack!\n\nThe attacker is a young girl named Vita, who calls herself a Belka Knight. She proves her strength by using an intelligent device with a mysterious cartridge system to quickly overwhelm Nanoha. Luckily, the Space-Time Administration Bureau is able to step in before she is completely crushed. Vita and her fellow knights Shamal, Signum, and Zafila are on a mission to steal magical power from mages in order to complete the Book of Darkness, one of the Lost Logia. For what sinister purpose are the knights after this Book of Darkness?\n\n[Written by MAL Rewrite]	TV	\N	13	Finished Airing	f	2005-10-02	2005-12-25	25 min per ep	PG-13 - Teens 13 or older	7.96	35472	805	3017	69648	fall	2005	https://cdn.myanimelist.net/images/anime/4/6767l.jpg	\N	2026-06-25 17:37:26.785814	2026-06-25 17:37:26.785814
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, anime_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.episodes (id, mal_id, anime_id, number, title, title_japanese, title_romanji, aired, filler, recap, duration, created_at) FROM stdin;
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, anime_id, created_at) FROM stdin;
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, mal_id, name) FROM stdin;
235	1	Action
236	2	Adventure
237	5	Avant Garde
238	46	Award Winning
239	28	Boys Love
240	4	Comedy
241	8	Drama
242	10	Fantasy
243	26	Girls Love
244	47	Gourmet
245	14	Horror
246	7	Mystery
247	22	Romance
248	24	Sci-Fi
249	36	Slice of Life
250	30	Sports
251	37	Supernatural
252	41	Suspense
253	9	Ecchi
254	49	Erotica
255	12	Hentai
256	50	Adult Cast
257	51	Anthropomorphic
258	52	CGDCT
259	53	Childcare
260	54	Combat Sports
261	81	Crossdressing
262	55	Delinquents
263	39	Detective
264	56	Educational
265	57	Gag Humor
266	58	Gore
267	35	Harem
268	59	High Stakes Game
269	13	Historical
270	60	Idols (Female)
271	61	Idols (Male)
272	62	Isekai
273	63	Iyashikei
274	64	Love Polygon
275	65	Magical Sex Shift
276	66	Mahou Shoujo
277	17	Martial Arts
278	18	Mecha
279	67	Medical
280	38	Military
281	19	Music
282	6	Mythology
283	68	Organized Crime
284	69	Otaku Culture
285	20	Parody
286	70	Performing Arts
287	71	Pets
288	40	Psychological
289	3	Racing
290	72	Reincarnation
291	73	Reverse Harem
292	74	Love Status Quo
293	21	Samurai
294	23	School
295	75	Showbiz
296	29	Space
297	11	Strategy Game
298	31	Super Power
299	76	Survival
300	77	Team Sports
301	78	Time Travel
302	32	Vampire
303	79	Video Game
304	80	Visual Arts
305	48	Workplace
306	82	Urban Fantasy
307	83	Villainess
308	43	Josei
309	15	Kids
310	42	Seinen
311	25	Shoujo
312	27	Shounen
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, role, created_at) FROM stdin;
6	pedrito	admin@gmail.com	$2b$10$3oO0TXgMQ77nsIGos4HKLO8pxt57cMtjZ00ESwVdi3zRhouAGRwmC	user	2026-06-25 18:34:05.026017
\.


--
-- Name: animes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animes_id_seq', 34, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_seq', 1, false);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 312, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: anime_genres anime_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_genres
    ADD CONSTRAINT anime_genres_pkey PRIMARY KEY (anime_id, genre_id);


--
-- Name: animes animes_mal_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes
    ADD CONSTRAINT animes_mal_id_key UNIQUE (mal_id);


--
-- Name: animes animes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes
    ADD CONSTRAINT animes_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: episodes episodes_anime_id_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_anime_id_number_key UNIQUE (anime_id, number);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_user_id_anime_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_anime_id_key UNIQUE (user_id, anime_id);


--
-- Name: genres genres_mal_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_mal_id_key UNIQUE (mal_id);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_animes_mal_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_animes_mal_id ON public.animes USING btree (mal_id);


--
-- Name: idx_comments_anime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comments_anime ON public.comments USING btree (anime_id);


--
-- Name: idx_episodes_anime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_episodes_anime ON public.episodes USING btree (anime_id);


--
-- Name: idx_favorites_anime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_anime ON public.favorites USING btree (anime_id);


--
-- Name: idx_favorites_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_user ON public.favorites USING btree (user_id);


--
-- Name: anime_genres anime_genres_anime_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_genres
    ADD CONSTRAINT anime_genres_anime_id_fkey FOREIGN KEY (anime_id) REFERENCES public.animes(id) ON DELETE CASCADE;


--
-- Name: anime_genres anime_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_genres
    ADD CONSTRAINT anime_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE;


--
-- Name: comments comments_anime_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_anime_id_fkey FOREIGN KEY (anime_id) REFERENCES public.animes(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: episodes episodes_anime_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_anime_id_fkey FOREIGN KEY (anime_id) REFERENCES public.animes(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_anime_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_anime_id_fkey FOREIGN KEY (anime_id) REFERENCES public.animes(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 9eU3ssJhsJRENYE9xQjAj6nWcIxOQqVQW4qqHRV89a29rlEjanBkvVQzLsV5fs0

