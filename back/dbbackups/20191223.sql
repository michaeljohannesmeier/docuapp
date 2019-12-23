PGDMP     %    
                w            docuapp    12.1    12.1 &    n           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            o           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            p           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            q           1262    16394    docuapp    DATABASE     e   CREATE DATABASE docuapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE docuapp;
                docuapp    false            �            1259    21572    article    TABLE     s   CREATE TABLE public.article (
    id bigint NOT NULL,
    title character varying(255),
    category2_id bigint
);
    DROP TABLE public.article;
       public         heap    docuapp    false            �            1259    21570    article_id_seq    SEQUENCE     w   CREATE SEQUENCE public.article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.article_id_seq;
       public          docuapp    false    203            r           0    0    article_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;
          public          docuapp    false    202            �            1259    21580 	   category1    TABLE     �   CREATE TABLE public.category1 (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);
    DROP TABLE public.category1;
       public         heap    docuapp    false            �            1259    21578    category1_id_seq    SEQUENCE     y   CREATE SEQUENCE public.category1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.category1_id_seq;
       public          docuapp    false    205            s           0    0    category1_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.category1_id_seq OWNED BY public.category1.id;
          public          docuapp    false    204            �            1259    21591 	   category2    TABLE     �   CREATE TABLE public.category2 (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255),
    category1_id bigint
);
    DROP TABLE public.category2;
       public         heap    docuapp    false            �            1259    21589    category2_id_seq    SEQUENCE     y   CREATE SEQUENCE public.category2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.category2_id_seq;
       public          docuapp    false    207            t           0    0    category2_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.category2_id_seq OWNED BY public.category2.id;
          public          docuapp    false    206            �            1259    21602    example    TABLE     m   CREATE TABLE public.example (
    id bigint NOT NULL,
    code text,
    text text,
    article_id bigint
);
    DROP TABLE public.example;
       public         heap    docuapp    false            �            1259    21600    example_id_seq    SEQUENCE     w   CREATE SEQUENCE public.example_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.example_id_seq;
       public          docuapp    false    209            u           0    0    example_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.example_id_seq OWNED BY public.example.id;
          public          docuapp    false    208            �           2604    21575 
   article id    DEFAULT     h   ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);
 9   ALTER TABLE public.article ALTER COLUMN id DROP DEFAULT;
       public          docuapp    false    202    203    203            �           2604    21583    category1 id    DEFAULT     l   ALTER TABLE ONLY public.category1 ALTER COLUMN id SET DEFAULT nextval('public.category1_id_seq'::regclass);
 ;   ALTER TABLE public.category1 ALTER COLUMN id DROP DEFAULT;
       public          docuapp    false    204    205    205            �           2604    21594    category2 id    DEFAULT     l   ALTER TABLE ONLY public.category2 ALTER COLUMN id SET DEFAULT nextval('public.category2_id_seq'::regclass);
 ;   ALTER TABLE public.category2 ALTER COLUMN id DROP DEFAULT;
       public          docuapp    false    206    207    207            �           2604    21605 
   example id    DEFAULT     h   ALTER TABLE ONLY public.example ALTER COLUMN id SET DEFAULT nextval('public.example_id_seq'::regclass);
 9   ALTER TABLE public.example ALTER COLUMN id DROP DEFAULT;
       public          docuapp    false    208    209    209            e          0    21572    article 
   TABLE DATA           :   COPY public.article (id, title, category2_id) FROM stdin;
    public          docuapp    false    203   �(       g          0    21580 	   category1 
   TABLE DATA           :   COPY public.category1 (id, description, name) FROM stdin;
    public          docuapp    false    205   5*       i          0    21591 	   category2 
   TABLE DATA           H   COPY public.category2 (id, description, name, category1_id) FROM stdin;
    public          docuapp    false    207   �*       k          0    21602    example 
   TABLE DATA           =   COPY public.example (id, code, text, article_id) FROM stdin;
    public          docuapp    false    209   �+       v           0    0    article_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.article_id_seq', 22, true);
          public          docuapp    false    202            w           0    0    category1_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category1_id_seq', 3, true);
          public          docuapp    false    204            x           0    0    category2_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category2_id_seq', 7, true);
          public          docuapp    false    206            y           0    0    example_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.example_id_seq', 127, true);
          public          docuapp    false    208            �           2606    21577    article article_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.article DROP CONSTRAINT article_pkey;
       public            docuapp    false    203            �           2606    21588    category1 category1_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.category1
    ADD CONSTRAINT category1_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.category1 DROP CONSTRAINT category1_pkey;
       public            docuapp    false    205            �           2606    21599    category2 category2_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.category2
    ADD CONSTRAINT category2_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.category2 DROP CONSTRAINT category2_pkey;
       public            docuapp    false    207            �           2606    21610    example example_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.example
    ADD CONSTRAINT example_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.example DROP CONSTRAINT example_pkey;
       public            docuapp    false    209            �           2606    21616 %   category2 uk81qp46wqopai2yr6mrps6ws61 
   CONSTRAINT     n   ALTER TABLE ONLY public.category2
    ADD CONSTRAINT uk81qp46wqopai2yr6mrps6ws61 UNIQUE (category1_id, name);
 O   ALTER TABLE ONLY public.category2 DROP CONSTRAINT uk81qp46wqopai2yr6mrps6ws61;
       public            docuapp    false    207    207            �           2606    21614 &   category1 uk_oidy6dni43wnnt6ddg9avrjpa 
   CONSTRAINT     a   ALTER TABLE ONLY public.category1
    ADD CONSTRAINT uk_oidy6dni43wnnt6ddg9avrjpa UNIQUE (name);
 P   ALTER TABLE ONLY public.category1 DROP CONSTRAINT uk_oidy6dni43wnnt6ddg9avrjpa;
       public            docuapp    false    205            �           2606    21612 #   article ukmu6oemny4vp5c3d307fu7i69w 
   CONSTRAINT     m   ALTER TABLE ONLY public.article
    ADD CONSTRAINT ukmu6oemny4vp5c3d307fu7i69w UNIQUE (category2_id, title);
 M   ALTER TABLE ONLY public.article DROP CONSTRAINT ukmu6oemny4vp5c3d307fu7i69w;
       public            docuapp    false    203    203            �           2606    21617 #   article fk2mjvc9lgstyf9d6b9ci9tcxic    FK CONSTRAINT     �   ALTER TABLE ONLY public.article
    ADD CONSTRAINT fk2mjvc9lgstyf9d6b9ci9tcxic FOREIGN KEY (category2_id) REFERENCES public.category2(id);
 M   ALTER TABLE ONLY public.article DROP CONSTRAINT fk2mjvc9lgstyf9d6b9ci9tcxic;
       public          docuapp    false    207    203    3038            �           2606    21627 #   example fk90pw2dwvmn9mspiis4seamcr8    FK CONSTRAINT     �   ALTER TABLE ONLY public.example
    ADD CONSTRAINT fk90pw2dwvmn9mspiis4seamcr8 FOREIGN KEY (article_id) REFERENCES public.article(id);
 M   ALTER TABLE ONLY public.example DROP CONSTRAINT fk90pw2dwvmn9mspiis4seamcr8;
       public          docuapp    false    203    209    3030            �           2606    21622 %   category2 fkjnvcyarg9p6puf2kqhjjoa7a8    FK CONSTRAINT     �   ALTER TABLE ONLY public.category2
    ADD CONSTRAINT fkjnvcyarg9p6puf2kqhjjoa7a8 FOREIGN KEY (category1_id) REFERENCES public.category1(id);
 O   ALTER TABLE ONLY public.category2 DROP CONSTRAINT fkjnvcyarg9p6puf2kqhjjoa7a8;
       public          docuapp    false    207    205    3034            e   <  x�E��R�0��7O��!��sgPpD��W���ΤIMR���&A�*�osΞ��7i��q�>���2�X���	��k�A������� �[}�d�(��n�x�s��ܫ�zK���㠈�Y(��=>��-�Z��	�K�C!zp����������75u#=�I��"�`�n����F8/��RW|Y7�z�ůV*�Aș������DE2�hd�U�C���K뱂���4�i��x^�2�"�����a�:����BR�ia�/u0d���ƝY������OjB�,�GC���h�3�i�:��Z2���-c��5��      g   s   x�=�1
�PDk��>D4�x -m֟!,�Y܏���W��7��*������.�M��}Q3Dg]� ^�Vg�l�aU�T&�x���o����4���;mzW��
��s�/": I�0W      i   �   x�U���0E��+�E��Ru@b��XJ�AM�T��<�%�����,����PcaG��Mt�~l�So:"µ Y�}j$�},J#����p|�E�R>��P}Rq�:�l����@�$I�F�ƋH������W�8�e�-g�z���ZPhۡ��mh�ϯ�O\oXZFbo���S(%�F����!��K�9��\j      k      x��;�r�Hr�ɧ��RK2EA"e�Rʝ������K��+ӵ;$F$l�a@�<��%ϒ'K�`@��w�����+��t�t�����I��P%�6͍�7����W]m����uZ��Br�2��u�拡��7y��ӼY}+��{R���U~e��3X���i��LR���XWJ��������i� ȴ��"��T]�O�J�,3J�Z[҆�Enk��;�ۻk�̾jS����1Z������b1�ˆ�7����Uwi���ֱ�=b� �u~Z��V��L2Ǝ j{ff5׹Z�O���rL�C�'ݓԌ-V�j�h�����:��3��H��� (��T�zނ̺ц{������ t� �u��^��A�N�-`_�O���S�2t���A�O]��
{��[�eG��1��v@�a��7�_ p7��y����k���k���;���-Pq�S7DZ��}�N��sB�I���| �j7ku�?_׬���n/hi6N�9(xEK:��ӳ���3M�h@�h��WiY�����2K�i�m�uGP�u�nd�<Py�i~y��5�ie9r����⒲*JS��ˋK��,���mU��-p�����Z�X0.��"�`A�o�w7�����**8�y��6w�`��'�`���@����*��sݘa�Z�k;89:��=�~Q$��ggg#�mx�-�eP �J���F�f�ztYF�}�3$}I����J��~@����>ܡ��K�%1'�� �Q0o��fb�@k4Ȯ��U��Ckg#E24��@����z��D�8�Gi�O ��|��&�K���f��g3lI�����,L�,�ޘ
8lNN@U#���:�Ѽ��&��x"J��?�\��%�lښ<�hQ�"o+URVm����A�<���e]��o��l�*��T�y�ԊXŐa��>��H��{5[��@�F�2����(I��T�o�+����"��@�-��%����ɛ�E�b:C1�h��r����9A�q�&v���ʏXt����i -�Y�W�S�.��G�=�!Vf���?�h:��V��&@;PU��b5������j��xd�1�aJU��;�k��[�_^�,!u!`�H$�&2���/�f+��e��*��_����Q��������+]}D=X����I�P�u��Y*]�U�ݳ䕓2�ۨR�?b��{,�a�=��H�f� S������X�6GR�\eVf5�g�+�Uެ7��[ T%obE��C}7�K@����Q��k6�Cm��=};l/;H�'4��@5񀝪U՚��m�e��'��iw<9""WeQխ��Y$:��/�g����[�ϹW�Jt�m���ãyaf���C4���c��� �$�J� `����/K-�����H�����5-A�r:0��E}��k��&�I�Os��8�H6��,�(h�m)*��w������pP\2�5�P�Ȇ|�3Ԩ���( *�&+tb1 k9c�$� �vf@�	�� 1\��:i��o��C��'����*���@��mć���=�>+�:[�[|��xr��0��;�`'p����a[�؈��7sk��~��R�K}c��Ae�W�J �������G4��}#db��嫛�߿|�Ds�]�y@F$��P���p z��LC¯��������ڨDךϮ�����{��pY\ -r���V�iJ���_���ǫW?�zv�����##��#
�Wj��PZ�0HAmu��9R�P�T&�Dy�s0����_�� �Fl����D�<8����c�%9�6����?���a���w�Gyxh�2�]� ���b3صVl��<c��ȃ�:�2��!v/��L�,%>�� aI��L[H� ژ�G�����4qN�ПDq�t�X� �C챁*��dRO�'gA�����4ǿ�&B��}_	��+���??��VbD�1�.3�1���`�i��y��J���\ױ:���%̀�8!�Z��Nfݤ"��=n;fhV�`J�����!����;�t��i*�D:H�J�T�ɀ�B*�WLL���Xcd��h��.�|� ��:\<�3�8�j��Y:��TIptv�7��b�Y"n6�!�i��.V �9�.H!�SA��-��%��.u���x&+m�#�x��yA��Ū$%_��%ջ>A­������3��;�-�
M�R�!dɠ�a���E��u4|Ht'|S���>��%!39x���f7�(m����$a٤G���s�=uP>��Xs���ɶ����|�%8�2H���\B�s��3�%�̌j�J%�"N��q���T|��=�׋U/"��,��F�4?�TݩHj:�|�K�f�Z��GRj�&8N��&��K��h��\��|�!Lp�;>�&�,:��eQ�a�i�%8����ȃ�
6=����	R��;�����l����d��eZdGKm�`|x0�L���xK���\!���XM|,������x�{tn���>����,Hqt�-�c�ϥl�9G8�[�:� p�,3�&p��7�wpS�sw&cP��(���B�XS	]R}��u
�D�ϳ5�j�ݓDb�~xO�[*�Y�@5f�(� ����O �I���3������k�����f�����I<�u����;'�j��V������?Z��T��l�Ďh*�9s��.ޫ���"_�	G����~���+�05��
��q��Ͱ-���\�Vn�� ׿��)��"om��V�TGv�4а(��-�]@;�7x25����x�7��Nz��<���Y��E����'P���x�$�h�5�P��/:��S��$�ƌ�ﵝ�ǀ��c���p]�X䒡��"h�aJ+A�A)�졻n��ۊ�qɀ�].��׶�k�MB�ϒ��Rb��ʘ��;������\) ��=i�v�?M[Z*'����`�d`�7K�-�7�^�hFdK�Ǵ�W�9��� �L�lWH�����]�g�Dא��w�nV�"㢘D��ژK��m��'�)�R�C-U�i0T"Ձ����n��1Ch�$��P�ݐN��_�y�}z�u����5������Z��F�P��ڧ�_+ւ�6M�]�q[��oS�^ly��������~.,"��S��
 �j?�iRq�s�ϞJ�|��,�밞Q�]�y{k*��W��p�i'H�/w崫�V*C�����f̝\z� x{A�ʵm�'��RZ/� �w��w�H�~��jy({Y��6�@�u�FBY�:�W<GY����������6.K���\��߭���Kt������K�54Щc�p�k�}���= z�u�J/�?�`�@-N�&�ݼl.$��dY�~*�Ln#l��;�`����>��4�vP4C�Kq�Ӵ^��Fi2��o�o��>(�u"��iҎZ	�k��Z��4��
5M�6M�2�T �	��#����)]D��-�-7e�kq����n�:���8���8'���름���r.�P�t] ���na�9략���=�"�����������&���}w��QY���?^��{ӼGu�}��͏j��{����M��t#�Ɓ�h�`�p�'@�M�9�#�xEFb#����Y�F�CL�A;/*�Kc��8-�ظ�Qg<�MB9�6U[Ml+�+л�K!���j���J&����ٻv+{a+���nF�+��8�o��g��n�E��r!t!�7QuK[3�5�L�������� eGd����������ɗ�xT��}m�A#�T����S���8 r����3��?�l[��Z}��CU�����^T��
M?�]d�YuZZ#y$����<�>w8��;���N���J�ǂ���ѕ�/�xm-	��N�Nē/c����k�WA�.Px�����\ :�&����C+�Ԭ�$a5X�\sǷa �7l���QⱫV�f�x$7���d�0��5�c�\d�96�A��=h�e0-�ٸ!��Xh%�
��#+`_p� ���z,�q9��
��/$ Z  �r7�Q��q{������p�Ʉ�\��M4������]�S|ʞ��A>cX4�>n`B��G��[
�;���E_�lo��L�b���v�:��x5	�#[»�:,�4���tGeɛ����wG3,��g������ �I�P~�P'�������4L �o���N��^��Q�r�'`9L����`�����j'�]O�+��H��Z�]u����c���)���;ĸs�}򨼂{�6Y}[��W��7�������_[��D�Te"���$iJ8_�a#j)����fB�9P�M ��!-�r�v]@ֵDz�Ղ�-F՞>ݢЁJ@&'���#�z���Vf��Hx2����2K���q�f��}�sx��G�Ͻ��$
o�\m���`n��3�&��񃃈S�p�E��JAp�OE�?M�8m�:l�$@����-mW��� �uM����V�̥�j��4��F#�,���q!4�iԴ'��݇��\\��h�Y���<�Ӣ���u��yD�.�U/��.T7��� ���
x�Ӛm������w\B��N�ީ�@ٻ�h2:~�V5�tM�����ay�4����/hy�.3���K��9�ψC�|A�,��41oSl�D�T`�Sw�'&��SFo�9�����?��U����s[��/<�GJD��[����X�����A�.����Xϵ$}��m=_��Vx �~�=?�=�Ϲ�wA�-�<������p���j\x�r����ݒK��nkZR��[�veo�S/�FJ��D������C�k�?c�Y1���q�8������0��"��@�)B���nRq��k�s�>B!�������4�v���(C�     