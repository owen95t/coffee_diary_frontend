<template>
  <b-container class="pl-0 ml-0">
    <b-row no-gutters>
      <b-col class="vh-100 w-25 mr-5" cols="2">
        <b-nav vertical class="side-bar">
          <div class="sidebar-items">
            <div class="text-left">
              <li class="sidebar-links" style="margin-left: 0; padding-left: 0;">
                <ul>
                  <a href="#" class="home">Home</a>
                </ul>
                <ul>
                  <a href="#" class="projects">Projects</a>
                </ul>
                <ul>
                  <a href="#" class="about">About</a>
                </ul>
                <ul>
                  <a href="#" class="contact">Contact</a>
                </ul>
                <ul>
                  <a href="#" class="createdBy">Me</a>
                </ul>
              </li>
            </div>
          </div>
        </b-nav>
      </b-col>
      <b-col class="ml-auto p-5 bg-info" cols="8">
        <TableView/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableView from "@/components/TableView";
export default {
name: "Dashboard2",
  components: {TableView}
}
</script>

<style scoped>

.side-bar {

}

.sidebar-links a{
  list-style: none;
  color: black;
  text-decoration: none;
  transition: 0.2s;
}
.home:hover, .about:hover, .contact:hover, .createdBy:hover, .projects:hover  {
  padding-left: 15px;
  transition-duration: 0.2s
}

</style>