using System;

namespace Statements.Collections
{
    public class Operations
    {
        public void Declarations(string[] args)
        {
            int a;
            int b = 2, c = 3;
            a = 1;

            Console.WriteLine(a+b*c);
        }

        public void ConstantDeclaration(string[] args)
        {
            const float pi = 3.14159271;
            const int r = 25;

            Console.WriteLine(pi * r *r);
        }

        public void Expression()
        {
            int i;
            i = 123;

            Console.WriteLine(i);
            i++;
            Console.WriteLine(i);
        }

        public void IfStatement(string[] args)
        {
            if(args.Length == 0)
                Console.WriteLine("No arguments");
            else
                Console.WriteLine("One or more arguments");
        }
        public void Switch(string[] args)
        {
            int n = args.Length;

            switch(n)
            {
                case 0:
                    Console.WriteLine("No arguments");
                    break;
                case 1:
                    Console.WriteLine("1 argument");
                    break;
                default:
                    Console.WriteLine($"{n} arguments");
                    break;
            }
        
        }

        public void WhileStatement(string[] args)
        {
            int i = 0;
            while(i < args.Length)
            {
                Console.WriteLine(args[i]);
                i++;
            }
        }

        public void DoStatement(string[] args)
        {
            string s;

            do
            {
                s = Console.ReadLine();
                Console.WriteLine(s);
            }while(!string.IsNullOrEmpty(s));
        }

        public voidForStatement(string[] args)
        {
            for(int i = 0; i < args.Length; i++)
                Console.WriteLine(args[i]);
        }

        public void ForEach(string[] args)
        {
            foreach(string s in args)
                Console.WriteLine(s);
        }

        public void Goto(string[] args)
        {
            int i = 0;

            goto check;
            loop:
            Console.WriteLine(args[i++]);
            check:
            if(i < args.Length)
                goto loop;
        }

        public IEnumerable<int> Range(int from, int to)
        {
            for (int i = from; i < to; i++)
                yield return i;
            yield break;
        }

        public void Yield(string[] args)
        {
            foreach(int i in Range(-10,10))
            {
                Console.WriteLine(i)
            }
        }
        
        public void Divide(double x, double y)
        {
            if(y == 0)
                throw new DivideByZeroException();
            return x / y;
        }

        public void TryCatchStatement(string[] args)
        {
            try
            {
                if(args.Length != 2)
                    throw new InvalidOperationException();
                double x = double.Parse(args[0]);
                double y = double.Parse(args[1]);
                Console.WriteLine(Divide(x, y));
            }
            catch
            {
                Console.WriteLine(e.message);
            }
            finally
            {
                Console.WriteLine("Good Bye");
            }
        }

        public void CheckedUnchecked(string[] args)
        {
            int x = int.MaxValue;

            unchecked
            {
                Console.WriteLine(x+1);
            }

            checked
            {
                Console.WriteLine(x+1);
            }
        }

        class Account
        {
            decimal balance;
            private readonly object sync = new object();
            public void Withdraw(decimal amount)
            {
                lock(sync)
                {
                    if(amount > balance)
                    {
                        throw new Exception("Insufficient Funds");
                    }

                    balance -= amount;
                }
            }

            public void Using(string[] args)
            {
                using (TextWriter w = File.CreateText("test.txt"))
                {
                    w.WriteLine("Line One");
                    w.WriteLine("Line Two");
                    w.WriteLine("Line Three");
                }
            }
        }
    }
}