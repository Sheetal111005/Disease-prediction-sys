import javax.swing.*;
import java.awt.event.*;

public class SwingBasicExample {
    public static void main(String[] args) {
        // Frame bana rahe
        JFrame frame = new JFrame("Swing Basic Example");

        // Label and Button
        JLabel label = new JLabel("Button not clicked yet!");
        label.setBounds(50, 50, 200, 30);

        JButton button = new JButton("Click Me!");
        button.setBounds(50, 100, 120, 30);

        // Button action
        button.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                label.setText("Button clicked 😄");
            }
        });

        // Add to frame
        frame.add(label);
        frame.add(button);

        frame.setSize(300, 200);
        frame.setLayout(null);  // Absolute positioning
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
