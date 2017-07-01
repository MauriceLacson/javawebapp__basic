package servlets;

import jdk.nashorn.internal.runtime.JSONFunctions;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by nxtlvl on 3/31/2017.
 */
public class MyForm extends HttpServlet{
    // Method to handle GET method request.
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Set response content type
        JSONObject obj = new JSONObject();

        //Get the value/s from submitted form
        String fullname = req.getParameter("fullname");
        String email = req.getParameter("email");
        String Day = req.getParameter("DOBDay");
        String Month = req.getParameter("DOBMonth");
        String Year = req.getParameter("DOBYear");


//        response.setContentType("text/html");

        PrintWriter out = resp.getWriter();


        obj.put("message", "success");
        obj.put("fullname", fullname);
        obj.put("email", email);
        obj.put("DOBDay", Day);
        obj.put("DOBMonth", Month);
        obj.put("DOBYear", Year);

        out.print(obj);
    }
    public void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        doGet(req, resp);
    }

}
