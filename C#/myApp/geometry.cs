using System;
using System.Collections.Generic;

public class Point
{
    public int x, y;
    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

/*
Point p1 = new Point(0, 0);
Point p2 = new Point(10, 20);
*/

public class Pair<TFirst, TSecond>
{
    public TFirst First;
    public TSecond Second;
}

/*
Pair<int,string> pair = new Pair<int,string> { First = 1, Second = "two" };
int i = pair.First;     // TFirst is int
string s = pair.Second; // TSecond is string
*/

public class Point3D: Point
{
    public int z;
    public Point3D(int x, int y, int z) : base(x,y)
    {
        this.z = z;
    }
}

/*
Point a = new Point(10, 20);
Point b = new Point3D(10, 20, 30);
*/

public class Color
{
    public static readonly Color Black = new Color(0, 0, 0);
    public static readonly Color White = new Color(255, 255, 255);
    public static readonly Color Red = new Color(255, 0, 0);
    public static readonly Color Green = new Color(0, 255, 0);
    public static readonly Color Blue = new Color(0, 0, 255);
    private byte r, g, b;
    public Color(byte r, byte g, byte b) 
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class RefExample
{
    static void Swap(ref int x, ref int y) 
    {
        int temp = x;
        x = y;
        y = temp;
    }
    public static void SwapExample() 
    {
        int i = 1, j = 2;
        Swap(ref i, ref j);
        Console.WriteLine($"{i} {j}");    // Outputs "2 1"
    }
}

class OutExample
{
    static void Divide(int x, int y, out int result, out int remainder) 
    {
        result = x / y;
        remainder = x % y;
    }
    public static void OutUsage() 
    {
        Divide(10, 3, out int res, out int rem);
        Console.WriteLine("{0} {1}", res, rem);	// Outputs "3 1"
    }
}

class Squares
{
    public static void WriteSquares()
    {
        int i = 0;
        int j;

        while(i < 10)
        {
            j = i * i;
            Console.WriteLine($"{i}*{i}={j}");
        }
    }
}

class Entity
{
    static int nextSerialNo;
    int serialNo;
    public Entity() 
    {
        serialNo = nextSerialNo++;
    }
    public int GetSerialNo() 
    {
        return serialNo;
    }
    public static int GetNextSerialNo() 
    {
        return nextSerialNo;
    }
    public static void SetNextSerialNo(int value) 
    {
        nextSerialNo = value;
    }
}

public abstract class Expression
{
    public abstract double Evaluate(Dictionary<string,object> vars);
}
public class Constant: Expression
{
    double value;
    public Constant(double value) 
    {
        this.value = value;
    }
    public override double Evaluate(Dictionary<string,object> vars) 
    {
        return value;
    }
}
public class VariableReference: Expression
{
    string name;
    public VariableReference(string name) 
    {
        this.name = name;
    }
    public override double Evaluate(Dictionary<string,object> vars) 
    {
        object value = vars[name];
        if (value == null) 
        {
            throw new Exception("Unknown variable: " + name);
        }
        return Convert.ToDouble(value);
    }
}
public class Operation: Expression
{
    Expression left;
    char op;
    Expression right;
    public Operation(Expression left, char op, Expression right) 
    {
        this.left = left;
        this.op = op;
        this.right = right;
    }
    public override double Evaluate(Dictionary<string,object> vars) 
    {
        double x = left.Evaluate(vars);
        double y = right.Evaluate(vars);
        switch (op) {
            case '+': return x + y;
            case '-': return x - y;
            case '*': return x * y;
            case '/': return x / y;
        }
        throw new Exception("Unknown operator");
    }
}

class InheritanceExample
{
    public static void ExampleUsage() 
    {
        Expression e = new Operation(
            new VariableReference("x"),
            '*',
            new Operation(
                new VariableReference("y"),
                '+',
                new Constant(2)
            )
        );
        Dictionary<string,object> vars = new Dictionary<string, object>();
        vars["x"] = 3;
        vars["y"] = 5;
        Console.WriteLine(e.Evaluate(vars));		// Outputs "21"
        vars["x"] = 1.5;
        vars["y"] = 9;
        Console.WriteLine(e.Evaluate(vars));		// Outputs "16.5"
    }
}

class OverloadingExample
{
    static void F() 
    {
        Console.WriteLine("F()");
    }
    static void F(object x) 
    {
        Console.WriteLine("F(object)");
    }
    static void F(int x) 
    {
        Console.WriteLine("F(int)");
    }
    static void F(double x) 
    {
        Console.WriteLine("F(double)");
    }
    static void F<T>(T x) 
    {
        Console.WriteLine("F<T>(T)");
    }
    static void F(double x, double y) 
    {
        Console.WriteLine("F(double, double)");
    }
    public static void UsageExample()
    {
        F();            // Invokes F()
        F(1);           // Invokes F(int)
        F(1.0);         // Invokes F(double)
        F("abc");       // Invokes F<string>(string)
        F((double)1);   // Invokes F(double)
        F((object)1);   // Invokes F(object)
        F<int>(1);      // Invokes F<int>(int)
        F(1, 1);        // Invokes F(double, double)
    }
}
