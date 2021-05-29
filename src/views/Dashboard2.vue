<template>
  <div id="body">
    <div id="viewport">
      <!-- Sidebar -->
      <div id="sidebar">
        <b-nav>
          <b-nav-item>
            <router-link to="/dashboard2">Home</router-link>
          </b-nav-item>
        </b-nav>
        <b-nav>
          <b-nav-item>
            <router-link to="/login">Login</router-link>
          </b-nav-item>
        </b-nav>

<!--        <ul class="nav">-->
<!--          <li>-->
<!--            <router-link to="/dashboard2">Home</router-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#">-->
<!--              <i class="zmdi zmdi-link"></i> Shortcuts-->
<!--            </a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#">-->
<!--              <i class="zmdi zmdi-widgets"></i> Overview-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
      <!-- Content -->
      <div id="content">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#"><i class="zmdi zmdi-notifications text-danger"></i>
                </a>
              </li>
              <li><a href="#">Test User</a></li>
            </ul>
          </div>
        </nav>
        <div class="container-fluid">
          <h1>Simple Sidebar</h1>
          <p>
            Make sure to keep all page content within the
            <code>#content</code>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableView from "@/components/TableView";
export default {
name: "Dashboard2",

}
</script>

<style scoped>

#sticky-sidebar{
  top: 30%;
}
/*.sidebar-links a{*/
/*  list-style: none;*/
/*  color: black;*/
/*  text-decoration: none;*/
/*  transition: 0.2s;*/
/*}*/
.home, .about, .logout{
  text-align: left;
}
.home:hover, .about:hover, .logout:hover  {
  padding-left: 15px;
  transition-duration: 0.2s
}

#body {
  overflow-x: hidden;
}

/* Toggle Styles */

#viewport {
  padding-left: 250px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#content {
  width: 100%;
  position: relative;
  margin-right: 0;
}

/* Sidebar Styles */

#sidebar {
  z-index: 1000;
  position: fixed;
  left: 250px;
  width: 250px;
  height: 100vh;
  margin-left: -250px;
  overflow-y: auto;
  background: #37474F;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}


#sidebar header a:hover {
  color: #fff;
}

#sidebar .nav{
}

#sidebar .nav a{
  background: none;
  border-bottom: 1px solid #455A64;
  color: #CFD8DC;
  font-size: 1rem;
  padding: 16px 24px;

}

#sidebar .nav a:hover{
  background: none;
  color: #ECEFF1;
}

#sidebar .nav a i{
  margin-right: 16px;
}

</style>