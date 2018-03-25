using System;
using Acme.Collections;
namespace myApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Stack s = new Stack();
            s.Push(1);
            s.Push(10);
            s.Push(100);
            Console.WriteLine(s.Pop());
            Console.WriteLine(s.Pop());
            Console.WriteLine(s.Pop());

            int i = 123;
            object o = i;
            int j = (int)o;        
        }
    }
}
