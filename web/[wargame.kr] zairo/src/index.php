<?php
    error_reporting(0);
    
    include("./config.php"); // hidden column name, $FLAG.

    mysql_connect("localhost","zairo","zairo_pz");
    mysql_select_db("zairo");

    /**********************************************************************************************************************/

    function rand_string()
    {
        $string = "1234567890abcdefghijklmnopqrstuvwxyz";
        return str_shuffle($string);
    }

    function reset_flag($count_column, $flag_column)
    {
        global $count;
        $flag = rand_string();
        $query = mysql_fetch_array(mysql_query("SELECT $count_column, $flag_column FROM findflag_2"));
        $count = $query[$count_column];
        if($query[$count_column] == 150)
        {
            if(mysql_query("UPDATE findflag_2 SET $flag_column='{$flag}';"))
            {
                mysql_query("UPDATE findflag_2 SET $count_column=0;");
                echo "reset flag<hr>";
            }
            return $flag;
        }
        else
        {
            mysql_query("UPDATE findflag_2 SET $count_column=($query[$count_column] + 1);");
        }
        return $query[$flag_column];
    }

    function get_pw($pw_column){
        $query = mysql_fetch_array(mysql_query("select $pw_column from findflag_2 limit 1"));
        return $query[$pw_column];
    }

    /**********************************************************************************************************************/

    $tmp_flag = "";
    $tmp_pw = "";
    $id = $_GET['id'];
    $pw = $_GET['pw'];
    $flags = $_GET['flag'];
    $count = 0;
    if(isset($id))
    {
        if(preg_match("/information|schema|user|where|=/i", $id) || substr_count($id,"(") > 0) exit("no hack");
        if(preg_match("/information|schema|user|where|=/i", $pw) || substr_count($pw,"(") > 0) exit("no hack");
        $tmp_flag = reset_flag($count_column, $flag_column);
        $tmp_pw = get_pw($pw_column);
        $query = mysql_fetch_array(mysql_query("SELECT * FROM findflag_2 WHERE $id_column='' union select null, ' and $pw_column=', {$pw}';"));
        echo "<hr />NOW COUNT = {$count}<br />";
        if($query[$id_column])
        {
            if(isset($pw) && isset($flags) && $pw === $tmp_pw && $flags === $tmp_flag)
            {
                echo "good job!!<br />FLAG : <b>".$FLAG."</b><hr>";
            }
            else
            {
                echo "Hello ".$query[$id_column]."<hr>";
            }
        }
    }else {
        highlight_file(__FILE__);
    }
?>
