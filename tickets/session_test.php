<?php
/*
 * Script:  session_test.php
 * Version: 1.1 @ 29th Mar 2016
 * Author:  Klemen Stirn
 * Website: http://www.phpjunkyard.com
 *
 * A file to test if PHP sessions work
 */

error_reporting(E_ALL);

session_name('TEST');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();

    if (!isset($_SESSION['test']) || $_SESSION['test'] !== true) {
        echo '
            <p><span style="color:red">ERROR:</span> session data not saved, ask your hosting company to verfy why PHP sessions are not working.</p>

            <form action="session_test.php" method="get">
                <input type="hidden" name="refresh" value="'.rand(10000,99999).'">
                <input type="submit" value="Try again">
            </form>
        ';
    } else {
        echo '<p><span style="color:green"><b>OK:</b></span> PHP sessions work fine.</p>';
    }
} else {
    if (session_start()) {
        $_SESSION['test'] = true;
        echo '
            <p>Session test started...</p>

            <form action="session_test.php" method="post">
                <input type="submit" value="Continue to Step 2">
            </form>
        ';
    } else {
        echo '
            <p><span style="color:red">ERROR:</span> cannot start a PHP session</p>

            <form action="session_test.php" method="get">
                <input type="hidden" name="refresh" value="'.rand(10000,99999).'">
                <input type="submit" value="Try again">
            </form>
        ';
    }
}

if (@ini_get('session.auto_start')) {
    echo '<p><span style="color:orange"><b>Warning:</b> PHP <b>session.auto_start</b> setting is enabled. This may cause session-related problems in scripts and should usually be turned off.</p>';
}
