select Track as track, Name as name, 
REPLACE(REPLACE(REPLACE(REPLACE(RTRIM(LTRIM(Artist)), CHAR(10), ''), CHAR(13), ''), CHAR(13) + CHAR(10), ''),',',';') as teacher,
REPLACE(REPLACE(REPLACE(REPLACE(RTRIM(LTRIM(Title)), CHAR(10), ''), CHAR(13), ''), CHAR(13) + CHAR(10), ''),',',';') as topic,
CONVERT(varchar(8), Duration) as duration, 
REPLACE(LTRIM(Album),'Segment','') as segment,
CASE 
	WHEN CONVERT(int,REPLACE(LTRIM(Album),'Segment',''))<9 THEN 1
	WHEN CONVERT(int,REPLACE(LTRIM(Album),'Segment',''))>8 AND CONVERT(int,REPLACE(LTRIM(Album),'Segment',''))<=16 THEN 2
	WHEN CONVERT(int,REPLACE(LTRIM(Album),'Segment',''))>17 AND CONVERT(int,REPLACE(LTRIM(Album),'Segment',''))<=24 THEN 3
	ELSE 4
	END as year,
url='url', 
CASE
    WHEN CHARINDEX(' ', LTRIM(Title))=0 THEN LTRIM(Title)
    ELSE substring(Title,1, CHARINDEX(' ', LTRIM(Title)))
END as type,
CASE
    WHEN CHARINDEX(' ', LTRIM(Title))=0 THEN LTRIM(Title)
    ELSE substring(Title,1, CHARINDEX(' ', LTRIM(Title)))
END as tag

	
/*	track,
	name,
    teacher,
    topic,
	duration,
    segment,
    year,
    url,
    type,
    tag, */
	from dbo.Records order by track