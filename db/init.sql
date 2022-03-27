--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

create database test;
connect to test;

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- Name: url; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url (
    shorturl character varying NOT NULL,
    fullurl character varying NOT NULL,
    count integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.url OWNER TO postgres;

--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url (shorturl, fullurl, count, "createdAt") FROM stdin;
2d5db3	ya.ru	2	2022-03-27 22:03:28.305
476fbd	ya.ru	2	2022-03-27 22:05:52.61
761b0f	ya.ru	2	2022-03-27 22:06:06.017
\.


--
-- Name: url PK_86d1f9aa0f59aa7beacd4057841; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT "PK_86d1f9aa0f59aa7beacd4057841" PRIMARY KEY (shorturl);


--
-- PostgreSQL database dump complete
--

